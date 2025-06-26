import { Conference } from "../dao/sport/conference.dao";
import { Division } from "../dao/sport/division.dao";
import { League } from "../dao/sport/league.dao";
import { Sport } from "../dao/sport/sport.dao";
import { Team } from "../dao/sport/team.dao";

export const SPORTS: Sport[] = [
    { id: 1, name: "American Football" },
    { id: 2, name: "Hockey" }
];

export const LEAGUES: League[] = [
    { id: 1, sportId: 1, name: "NFL" },
    { id: 1, sportId: 2, name: "NHL" }
];

export const CONFERENCES: Conference[] = [
    // NFL
    { id: 1, leagueId: 1, sportId: 1, name: "American Football Conference" },
    { id: 2, leagueId: 1, sportId: 1, name: "National Football Conference" },

    // NHL
    { id: 1, leagueId: 1, sportId: 2, name: "Eastern Conference" },
    { id: 2, leagueId: 1, sportId: 2, name: "Western Conference" }
];

export const DIVISIONS: Division[] = [
    // NFL AFC Divisions
    { id: 1, leagueId: 1, sportId: 1, conferenceId: 1, name: "East" },
    { id: 2, leagueId: 1, sportId: 1, conferenceId: 1, name: "North" },
    { id: 3, leagueId: 1, sportId: 1, conferenceId: 1, name: "South" },
    { id: 4, leagueId: 1, sportId: 1, conferenceId: 1, name: "West" },

    // NFL NFC Divisions
    { id: 5, leagueId: 1, sportId: 1, conferenceId: 2, name: "East" },
    { id: 6, leagueId: 1, sportId: 1, conferenceId: 2, name: "North" },
    { id: 7, leagueId: 1, sportId: 1, conferenceId: 2, name: "South" },
    { id: 8, leagueId: 1, sportId: 1, conferenceId: 2, name: "West" },

    // NHL Eastern Divisions
    { id: 1, leagueId: 1, sportId: 2, conferenceId: 1, name: "Atlantic" },
    { id: 2, leagueId: 1, sportId: 2, conferenceId: 1, name: "Metropolitan" },

    // NHL Western Divisions
    { id: 3, leagueId: 1, sportId: 2, conferenceId: 2, name: "Central" },
    { id: 4, leagueId: 1, sportId: 2, conferenceId: 2, name: "Pacific" }
];

export const TEAMS: Team[] = [
    // NFL AFC East
    { id: 1, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 1, name: "Buffalo Bills", city: "Buffalo", abbreviation: "BUF" },
    { id: 2, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 1, name: "Miami Dolphins", city: "Miami", abbreviation: "MIA" },
    { id: 3, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 1, name: "New England Patriots", city: "New England", abbreviation: "NE" },
    { id: 4, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 1, name: "New York Jets", city: "New York", abbreviation: "NYJ" },

    // NFL AFC North
    { id: 5, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 2, name: "Baltimore Ravens", city: "Baltimore", abbreviation: "BAL" },
    { id: 6, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 2, name: "Cincinnati Bengals", city: "Cincinnati", abbreviation: "CIN" },
    { id: 7, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 2, name: "Cleveland Browns", city: "Cleveland", abbreviation: "CLE" },
    { id: 8, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 2, name: "Pittsburgh Steelers", city: "Pittsburgh", abbreviation: "PIT" },

    // NFL AFC South
    { id: 9, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 3, name: "Houston Texans", city: "Houston", abbreviation: "HOU" },
    { id: 10, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 3, name: "Indianapolis Colts", city: "Indianapolis", abbreviation: "IND" },
    { id: 11, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 3, name: "Jacksonville Jaguars", city: "Jacksonville", abbreviation: "JAX" },
    { id: 12, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 3, name: "Tennessee Titans", city: "Tennessee", abbreviation: "TEN" },

    // NFL AFC West
    { id: 13, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 4, name: "Denver Broncos", city: "Denver", abbreviation: "DEN" },
    { id: 14, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 4, name: "Kansas City Chiefs", city: "Kansas City", abbreviation: "KC" },
    { id: 15, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 4, name: "Las Vegas Raiders", city: "Las Vegas", abbreviation: "LV" },
    { id: 16, leagueId: 1, sportId: 1, conferenceId: 1, divisionId: 4, name: "Los Angeles Chargers", city: "Los Angeles", abbreviation: "LAC" },

    // NFL NFC East
    { id: 17, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 5, name: "Dallas Cowboys", city: "Dallas", abbreviation: "DAL" },
    { id: 18, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 5, name: "New York Giants", city: "New York", abbreviation: "NYG" },
    { id: 19, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 5, name: "Philadelphia Eagles", city: "Philadelphia", abbreviation: "PHI" },
    { id: 20, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 5, name: "Washington Commanders", city: "Washington", abbreviation: "WAS" },

    // NFL NFC North
    { id: 21, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 6, name: "Chicago Bears", city: "Chicago", abbreviation: "CHI" },
    { id: 22, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 6, name: "Detroit Lions", city: "Detroit", abbreviation: "DET" },
    { id: 23, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 6, name: "Green Bay Packers", city: "Green Bay", abbreviation: "GB" },
    { id: 24, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 6, name: "Minnesota Vikings", city: "Minnesota", abbreviation: "MIN" },

    // NFL NFC South
    { id: 25, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 7, name: "Atlanta Falcons", city: "Atlanta", abbreviation: "ATL" },
    { id: 26, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 7, name: "Carolina Panthers", city: "Carolina", abbreviation: "CAR" },
    { id: 27, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 7, name: "New Orleans Saints", city: "New Orleans", abbreviation: "NO" },
    { id: 28, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 7, name: "Tampa Bay Buccaneers", city: "Tampa Bay", abbreviation: "TB" },

    // NFL NFC West
    { id: 29, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 8, name: "Arizona Cardinals", city: "Arizona", abbreviation: "ARI" },
    { id: 30, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 8, name: "Los Angeles Rams", city: "Los Angeles", abbreviation: "LAR" },
    { id: 31, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 8, name: "San Francisco 49ers", city: "San Francisco", abbreviation: "SF" },
    { id: 32, leagueId: 1, sportId: 1, conferenceId: 2, divisionId: 8, name: "Seattle Seahawks", city: "Seattle", abbreviation: "SEA" },

    // NHL Eastern Conference Atlantic Division
    { id: 101, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Boston Bruins", city: "Boston", abbreviation: "BOS" },
    { id: 102, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Buffalo Sabres", city: "Buffalo", abbreviation: "BUF" },
    { id: 103, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Detroit Red Wings", city: "Detroit", abbreviation: "DET" },
    { id: 104, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Florida Panthers", city: "Florida", abbreviation: "FLA" },
    { id: 105, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Montreal Canadiens", city: "Montreal", abbreviation: "MTL" },
    { id: 106, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Ottawa Senators", city: "Ottawa", abbreviation: "OTT" },
    { id: 107, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Tampa Bay Lightning", city: "Tampa Bay", abbreviation: "TBL" },
    { id: 108, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 1, name: "Toronto Maple Leafs", city: "Toronto", abbreviation: "TOR" },

    // NHL Eastern Conference Metropolitan Division
    { id: 109, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "Carolina Hurricanes", city: "Carolina", abbreviation: "CAR" },
    { id: 110, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "Columbus Blue Jackets", city: "Columbus", abbreviation: "CBJ" },
    { id: 111, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "New Jersey Devils", city: "New Jersey", abbreviation: "NJD" },
    { id: 112, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "New York Islanders", city: "New York", abbreviation: "NYI" },
    { id: 113, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "New York Rangers", city: "New York", abbreviation: "NYR" },
    { id: 114, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "Philadelphia Flyers", city: "Philadelphia", abbreviation: "PHI" },
    { id: 115, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "Pittsburgh Penguins", city: "Pittsburgh", abbreviation: "PIT" },
    { id: 116, leagueId: 1, sportId: 2, conferenceId: 1, divisionId: 2, name: "Washington Capitals", city: "Washington", abbreviation: "WSH" },

    // NHL Western Conference Central Division
    { id: 117, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Chicago Blackhawks", city: "Chicago", abbreviation: "CHI" },
    { id: 118, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Colorado Avalanche", city: "Colorado", abbreviation: "COL" },
    { id: 119, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Dallas Stars", city: "Dallas", abbreviation: "DAL" },
    { id: 120, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Minnesota Wild", city: "Minnesota", abbreviation: "MIN" },
    { id: 121, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Nashville Predators", city: "Nashville", abbreviation: "NSH" },
    { id: 122, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "St. Louis Blues", city: "St. Louis", abbreviation: "STL" },
    { id: 123, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 3, name: "Winnipeg Jets", city: "Winnipeg", abbreviation: "WPG" },

    // NHL Western Conference Pacific Division
    { id: 124, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "Anaheim Ducks", city: "Anaheim", abbreviation: "ANA" },
    { id: 125, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "Calgary Flames", city: "Calgary", abbreviation: "CGY" },
    { id: 126, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "Edmonton Oilers", city: "Edmonton", abbreviation: "EDM" },
    { id: 127, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "Los Angeles Kings", city: "Los Angeles", abbreviation: "LAK" },
    { id: 128, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "San Jose Sharks", city: "San Jose", abbreviation: "SJS" },
    { id: 129, leagueId: 1, sportId: 2, conferenceId: 2, divisionId: 4, name: "Vancouver Canucks", city: "Vancouver", abbreviation: "VAN" }
];