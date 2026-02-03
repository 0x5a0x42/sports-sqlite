import { DAO } from "../dao";
import { Division } from "./division.dao";
import { Team } from "./team.dao";

export interface ConferenceRecord {
    conference_id: number;
    league_id: number;
    sport_id: number;
    name: string;
}

export interface Conference {
    id: number;
    leagueId: number;
    sportId: number;
    name: string;
    // Optional
    divisions?: Division[];
    teams?: Team[];
}

export class ConferenceDAO extends DAO<ConferenceRecord, Conference> {
    public readonly columns = ["conference_id", "league_id", "sport_id", "name"] as const;
    public readonly table_name = "conference" as const;
    public readonly table_schema = `
        CREATE TABLE IF NOT EXISTS ${this.table_name} (
            conference_id INTEGER,
            league_id INTEGER NOT NULL,
            sport_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            PRIMARY KEY (conference_id),
            FOREIGN KEY (league_id, sport_id) REFERENCES league(league_id, sport_id)
        );
    ` as const;
    public readonly primaryKeys = ["conference_id"] as const;

    public async createIndexes(): Promise<void> {
        await this.run(`CREATE INDEX IF NOT EXISTS idx_conference_league_sport ON ${this.table_name} (league_id, sport_id);`);
    }

    public mapRecord(record: ConferenceRecord): Conference {
        return {
            id: record.conference_id,
            leagueId: record.league_id,
            sportId: record.sport_id,
            name: record.name
        };
    }

    public mapToRecord(item: Conference): ConferenceRecord {
        return {
            conference_id: item.id,
            league_id: item.leagueId,
            sport_id: item.sportId,
            name: item.name
        };
    }
}