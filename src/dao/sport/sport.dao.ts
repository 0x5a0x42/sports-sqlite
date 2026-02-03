import { DAO } from "../dao";
import { League } from "./league.dao";

export interface SportRecord {
    sport_id: number;
    name: string;
}

export interface Sport {
    id: number;
    name: string;
    // Optional
    leagues?: League[];
}

export class SportDAO extends DAO<SportRecord, Sport> {
    public readonly columns = ["sport_id", "name"] as const;
    public readonly table_name = "sport" as const;
    public readonly table_schema = `
        CREATE TABLE IF NOT EXISTS ${this.table_name} (
            sport_id INTEGER,
            name TEXT NOT NULL UNIQUE,
            PRIMARY KEY (sport_id)
        );
    ` as const;
    public readonly primaryKeys = ["sport_id"] as const;

    public mapRecord(record: SportRecord): Sport {
        return {
            id: record.sport_id,
            name: record.name
        };
    }

    public mapToRecord(item: Sport): SportRecord {
        return {
            sport_id: item.id,
            name: item.name
        };
    }
}
