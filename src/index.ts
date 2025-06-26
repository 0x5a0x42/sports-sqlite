import path from "path";
import { SportDAO } from "./dao/sport/sport.dao";
import { LeagueDAO } from "./dao/sport/league.dao";
import { ConferenceDAO } from "./dao/sport/conference.dao";
import { DivisionDAO } from "./dao/sport/division.dao";
import { TeamDAO } from "./dao/sport/team.dao";
import { SPORTS, LEAGUES, CONFERENCES, DIVISIONS, TEAMS } from "./data/default-data";

async function main() {
  const dbPath = path.resolve(__dirname, "sports.db");

  const sportDAO = new SportDAO(dbPath);
  const leagueDAO = new LeagueDAO(dbPath);
  const conferenceDAO = new ConferenceDAO(dbPath);
  const divisionDAO = new DivisionDAO(dbPath);
  const teamDAO = new TeamDAO(dbPath);

  // Create tables
  await sportDAO.createTable();
  await leagueDAO.createTable();
  await conferenceDAO.createTable();
  await divisionDAO.createTable();
  await teamDAO.createTable();

  // Create indexes
  await leagueDAO.createIndexes();
  await conferenceDAO.createIndexes();
  await divisionDAO.createIndexes();
  await teamDAO.createIndexes();

  // Insert data
  await sportDAO.insert(SPORTS);
  await leagueDAO.insert(LEAGUES);
  await conferenceDAO.insert(CONFERENCES);
  await divisionDAO.insert(DIVISIONS);
  await teamDAO.insert(TEAMS);

  console.log("Database initialized successfully!");

  // Optional: close connections
  await Promise.all([
    sportDAO.close(),
    leagueDAO.close(),
    conferenceDAO.close(),
    divisionDAO.close(),
    teamDAO.close()
  ]);
}

main().catch(console.error);
