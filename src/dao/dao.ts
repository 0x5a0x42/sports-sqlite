import { Database } from "sqlite3";

export abstract class DAO<T extends Record<string, any>, U = T> {
    protected database!: Database;
    /** List of column names for a table. */
    public abstract readonly columns: readonly string[];
    /** The table's name. */
    public abstract readonly table_name: string;
    /** The create table SQL statement. */
    public abstract readonly table_schema: string;
    /** List of column names that form the primary key. */
    public abstract readonly primaryKeys: readonly string[];

    /**
     * Map DB record (snake_case) to application model (camelCase).
     */
    public abstract mapRecord(record: T): U;

    /**
     * Optional reverse mapping: application model → DB record.
     * Needed for inserts/updates if model and DB differ.
     * Default: identity function (no transform).
     */
    public mapToRecord(item: U): T {
        return item as unknown as T;
    }

    /**
     * Create indexes related to this table.
     * Override in subclasses if needed.
     */
    public async createIndexes(): Promise<void> {
        // Default: no indexes, subclasses override as needed
    }

    constructor(databaseFilePath: string) {
        this.database = new Database(databaseFilePath);
    }

    /**
     * Close DB connection gracefully.
     */
    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.close(err => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    /**
     * Create table if not exists.
     */
    public async createTable(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.run(this.table_schema, (error: Error | null) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.info(`Successfully created (${this.table_name}) table!`);
                    resolve();
                }
            });
        });
    }

    /**
     * Generic run for queries without results.
     * @param sql SQL string with parameter placeholders
     * @param params parameter values for SQL placeholders
     */
    protected run(sql: string, params?: unknown[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.run(sql, params ?? [], (error: Error | null) => {
                if (error) {
                    console.error(error);
                    console.error(sql);
                    console.error(params);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Get all rows mapped to application model.
     */
    public async all(): Promise<U[]> {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT * FROM ${this.table_name}`, [], (err, rows: T[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(this.mapRecord));
                }
            });
        });
    }

    /**
     * Insert one or more app models.
     * Converts app models (U) → DB records (T) internally.
     * Validates the mapped records strictly against expected columns.
     * @param item single or array of app model items to insert
     */
    public async insert(item: U | U[]): Promise<void> {
        const records = (Array.isArray(item) ? item : [item]).map(u => this.mapToRecord(u));
        if (records.length === 0) return;

        // Validate each record against expected columns
        for (const [i, record] of records.entries()) {
            const recordKeys = Object.keys(record);
            // Check for missing columns
            const missingColumns = this.columns.filter(col => !(col in record));
            if (missingColumns.length > 0) {
                throw new Error(`Record at index ${i} is missing required columns: ${missingColumns.join(', ')}`);
            }
            // Check for unexpected columns
            const unexpectedColumns = recordKeys.filter(key => !this.columns.includes(key));
            if (unexpectedColumns.length > 0) {
                throw new Error(`Record at index ${i} has unexpected columns: ${unexpectedColumns.join(', ')}`);
            }
        }

        const placeholdersPerRow = `(${this.columns.map(() => '?').join(', ')})`;
        const allPlaceholders = records.map(() => placeholdersPerRow).join(', ');
        const sql = `INSERT OR IGNORE INTO ${this.table_name} (${this.columns.join(', ')}) VALUES ${allPlaceholders}`;
        const values = records.flatMap(record => this.columns.map(field => record[field]));

        await this.run(sql, values);
    }

    /**
     * Find a record using a composite or singular primary key.
     * @param key Object with key-value pairs matching the primary key(s).
     * @returns The mapped application model or null if not found.
     */
    public async findByKey(key: Partial<T>): Promise<U | null> {
        // Construct WHERE clause from all primary key fields
        const whereClause = this.primaryKeys.map(k => `${k} = ?`).join(" AND ");
        const values = this.primaryKeys.map(k => key[k]);

        return new Promise((resolve, reject) => {
            this.database.get(
                `SELECT * FROM ${this.table_name} WHERE ${whereClause}`,
                values,
                (err, row: T) => {
                    if (err) return reject(err);
                    if (!row) return resolve(null);
                    resolve(this.mapRecord(row));
                }
            );
        });
    }

    /**
     * Update a record using a composite or singular primary key.
     * Only non-key fields that are defined will be updated.
     * @param key Object with key-value pairs matching the primary key(s).
     * @param updates Partial application model containing updated fields.
     */
    public async updateByKey(key: Partial<T>, updates: Partial<U>): Promise<void> {
        // Convert application model to DB record format
        const dbRecord = this.mapToRecord(updates as U);

        // Filter out undefined fields and primary key fields from update
        const updateColumns = Object.keys(dbRecord).filter(
            k => !this.primaryKeys.includes(k) && dbRecord[k] !== undefined
        );

        if (updateColumns.length === 0) return;

        // Build SET and WHERE clauses for the update statement
        const setClause = updateColumns.map(col => `${col} = ?`).join(", ");
        const whereClause = this.primaryKeys.map(k => `${k} = ?`).join(" AND ");

        // Combine update values and key values for the query
        const values = [
            ...updateColumns.map(col => dbRecord[col]),
            ...this.primaryKeys.map(k => key[k])
        ];

        const sql = `UPDATE ${this.table_name} SET ${setClause} WHERE ${whereClause}`;
        await this.run(sql, values);
    }

    /**
     * Delete a record using a composite or singular primary key.
     * @param key Object with key-value pairs matching the primary key(s).
     */
    public async deleteByKey(key: Partial<T>): Promise<void> {
        // Construct WHERE clause from all primary key fields
        const whereClause = this.primaryKeys.map(k => `${k} = ?`).join(" AND ");
        const values = this.primaryKeys.map(k => key[k]);

        const sql = `DELETE FROM ${this.table_name} WHERE ${whereClause}`;
        await this.run(sql, values);
    }
}