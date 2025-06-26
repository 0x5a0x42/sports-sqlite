import { DAO } from "../dao";
import { Conference } from "./conference.dao";
import { Division } from "./division.dao";
import { Team } from "./team.dao";

export interface LeagueRecord {
    league_id: number;
    sport_id: number;
    name: string;
}

export interface League {
    id: number;
    sportId: number;
    name: string;
    // Optional
    conferences?: Conference[];
    divisions?: Division[];
    teams?: Team[];
}

export class LeagueDAO extends DAO<LeagueRecord, League> {
    public readonly columns = ["league_id", "sport_id", "name"] as const;
    public readonly table_name = "league" as const;
    public readonly table_schema = `
        CREATE TABLE IF NOT EXISTS ${this.table_name} (
            league_id INTEGER NOT NULL,
            sport_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            PRIMARY KEY (league_id, sport_id),
            FOREIGN KEY (sport_id) REFERENCES sport(sport_id)
        );
    ` as const;
    public readonly primaryKeys = ["league_id", "sport_id"] as const;

    public async createIndexes(): Promise<void> {
        await this.run(`CREATE INDEX IF NOT EXISTS idx_league_sport ON ${this.table_name} (league_id, sport_id);`);
    }

    public mapRecord(record: LeagueRecord): League {
        return {
            id: record.league_id,
            sportId: record.sport_id,
            name: record.name
        };
    }

    public mapToRecord(item: League): LeagueRecord {
        return {
            league_id: item.id,
            sport_id: item.sportId,
            name: item.name
        };
    }
}