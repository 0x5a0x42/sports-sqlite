import { DAO } from "../dao";
import { Team } from "./team.dao";

export interface DivisionRecord {
    division_id: number;
    league_id: number;
    sport_id: number;
    conference_id: number | null;
    name: string;
}

export interface Division {
    id: number;
    leagueId: number;
    sportId: number;
    conferenceId?: number;
    name: string;
    // Optional
    teams?: Team[];
}

export class DivisionDAO extends DAO<DivisionRecord, Division> {
    public readonly columns = ["division_id", "league_id", "sport_id", "conference_id", "name"] as const;
    public readonly table_name = "division";
    public readonly table_schema = `
        CREATE TABLE IF NOT EXISTS ${this.table_name} (
            division_id INTEGER PRIMARY KEY,
            league_id INTEGER NOT NULL,
            sport_id INTEGER NOT NULL,
            conference_id INTEGER,
            name TEXT NOT NULL,
            FOREIGN KEY (league_id, sport_id) REFERENCES league(league_id, sport_id),
            FOREIGN KEY (conference_id) REFERENCES conference(conference_id)
        );
    `;

    public async createIndexes(): Promise<void> {
        await this.run(`CREATE INDEX IF NOT EXISTS idx_division_league_sport ON ${this.table_name}(league_id, sport_id);`);
        await this.run(`CREATE INDEX IF NOT EXISTS idx_division_conference ON ${this.table_name}(conference_id);`);
    }

    public mapRecord(record: DivisionRecord): Division {
        return {
            id: record.division_id,
            leagueId: record.league_id,
            sportId: record.sport_id,
            conferenceId: record.conference_id !== null ? record.conference_id : undefined,
            name: record.name
        };
    }

    public mapToRecord(item: Division): DivisionRecord {
        return {
            division_id: item.id,
            league_id: item.leagueId,
            sport_id: item.sportId,
            conference_id: item.conferenceId !== undefined ? item.conferenceId : null,
            name: item.name
        };
    }
}