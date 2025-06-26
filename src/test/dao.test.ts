// tests/dao.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import { SportDAO } from '../dao/sport/sport.dao';
import { LeagueDAO } from '../dao/sport/league.dao';

const dbPath = path.resolve(__dirname, '../test.db');
const sportDAO = new SportDAO(dbPath);
const leagueDAO = new LeagueDAO(dbPath);

beforeAll(async () => {
  await sportDAO.createTable();
  await leagueDAO.createTable();

  await sportDAO.insert({ id: 99, name: 'TestSport' });
  await leagueDAO.insert({ id: 88, sportId: 99, name: 'TestLeague' });
});

afterAll(async () => {
  await sportDAO.deleteByKey({ sport_id: 99 });
  await leagueDAO.deleteByKey({ league_id: 88, sport_id: 99 });
  await sportDAO.close();
  await leagueDAO.close();
});

describe('DAO findByKey()', () => {
  it('should find an inserted sport by key', async () => {
    const sport = await sportDAO.findByKey({ sport_id: 99 });
    expect(sport).not.toBeNull();
    expect(sport?.name).toBe('TestSport');
  });

  it('should find an inserted league by composite key', async () => {
    const league = await leagueDAO.findByKey({ league_id: 88, sport_id: 99 });
    expect(league).not.toBeNull();
    expect(league?.name).toBe('TestLeague');
  });
});

describe('DAO updateByKey()', () => {
  it('should update the name of a league', async () => {
    await leagueDAO.updateByKey({ league_id: 88, sport_id: 99 }, { name: 'UpdatedLeague' });
    const league = await leagueDAO.findByKey({ league_id: 88, sport_id: 99 });
    expect(league?.name).toBe('UpdatedLeague');
  });
});

describe('DAO deleteByKey()', () => {
  it('should delete a league by composite key', async () => {
    await leagueDAO.deleteByKey({ league_id: 88, sport_id: 99 });
    const league = await leagueDAO.findByKey({ league_id: 88, sport_id: 99 });
    expect(league).toBeNull();
  });
});
