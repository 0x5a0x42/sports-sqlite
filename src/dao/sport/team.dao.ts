import { DAO } from "../dao";

export interface TeamRecord {
    team_id: number;
    league_id: number;
    sport_id: number;
    conference_id: number | null;
    division_id: number | null;
    name: string;
    city: string;
    abbreviation: string;
}

export interface Team {
    id: number;
    leagueId: number;
    sportId: number;
    conferenceId?: number;
    divisionId?: number;
    name: string;
    city: string;
    abbreviation: string;
}

export class TeamDAO extends DAO<TeamRecord, Team> {
    public readonly columns = ["team_id", "league_id", "sport_id", "conference_id", "division_id", "name", "city", "abbreviation"] as const;
    public readonly table_name = "team" as const;
    public readonly table_schema = `
        CREATE TABLE IF NOT EXISTS ${this.table_name} (
            team_id INTEGER,
            league_id INTEGER NOT NULL,
            sport_id INTEGER NOT NULL,
            conference_id INTEGER,
            division_id INTEGER,
            name TEXT NOT NULL,
            city TEXT,
            abbreviation TEXT,
            PRIMARY KEY (team_id)
            FOREIGN KEY (league_id, sport_id) REFERENCES league(league_id, sport_id),
            FOREIGN KEY (conference_id) REFERENCES conference(conference_id),
            FOREIGN KEY (division_id) REFERENCES division(division_id)
        );
    ` as const;
    public readonly primaryKeys = ["team_id"] as const;

    public async createIndexes(): Promise<void> {
        await this.run(`CREATE INDEX IF NOT EXISTS idx_team_league_sport ON ${this.table_name} (league_id, sport_id);`);
        await this.run(`CREATE INDEX IF NOT EXISTS idx_team_conference ON ${this.table_name} (conference_id);`);
        await this.run(`CREATE INDEX IF NOT EXISTS idx_team_division ON ${this.table_name} (division_id);`);
    }

    public mapRecord(record: TeamRecord): Team {
        return {
            id: record.team_id,
            leagueId: record.league_id,
            sportId: record.sport_id,
            conferenceId: record.conference_id !== null ? record.conference_id : undefined,
            divisionId: record.division_id !== null ? record.division_id : undefined,
            name: record.name,
            city: record.city,
            abbreviation: record.abbreviation
        };
    }

    public mapToRecord(item: Team): TeamRecord {
        return {
            team_id: item.id,
            league_id: item.leagueId,
            sport_id: item.sportId,
            conference_id: item.conferenceId !== undefined ? item.conferenceId : null,
            division_id: item.divisionId !== undefined ? item.divisionId : null,
            name: item.name,
            city: item.city,
            abbreviation: item.abbreviation
        };
    }
}