import { query } from '$lib/db.server.js';

export async function load() {
  const players = await query('SELECT COUNT(*) AS total FROM players');
  const tournaments = await query('SELECT COUNT(*) AS total FROM tournaments');
  const matches = await query('SELECT COUNT(*) AS total FROM matches');
  const latest = await query(`
    SELECT id, title, place, start_date
    FROM tournaments
    ORDER BY id DESC
    LIMIT 5
  `);

  return {
    playerCount: players.rows[0].total,
    tournamentCount: tournaments.rows[0].total,
    matchCount: matches.rows[0].total,
    latestTournaments: latest.rows
  };
}
