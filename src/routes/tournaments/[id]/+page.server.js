import { error, fail } from '@sveltejs/kit';
import { query } from '$lib/db.server.js';

function shufflePlayers(players) {
  const list = [...players];

  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }

  return list;
}

export async function load({ params }) {
  const tournamentId = Number(params.id);

  const tournamentResult = await query('SELECT * FROM tournaments WHERE id = $1', [tournamentId]);

  if (tournamentResult.rows.length === 0) {
    throw error(404, 'Tournament not found');
  }

  const participants = await query(`
    SELECT p.*
    FROM players p
    INNER JOIN tournament_players tp ON tp.player_id = p.id
    WHERE tp.tournament_id = $1
    ORDER BY p.name
  `, [tournamentId]);

  const availablePlayers = await query(`
    SELECT p.*
    FROM players p
    WHERE NOT EXISTS (
      SELECT 1 FROM tournament_players tp
      WHERE tp.player_id = p.id AND tp.tournament_id = $1
    )
    ORDER BY p.name
  `, [tournamentId]);

  const matches = await query(`
    SELECT m.id, m.round_no, m.played_at,
      p1.name AS player1_name,
      p2.name AS player2_name,
      w.name AS winner_name
    FROM matches m
    LEFT JOIN players p1 ON p1.id = m.player1_id
    LEFT JOIN players p2 ON p2.id = m.player2_id
    LEFT JOIN players w ON w.id = m.winner_id
    WHERE m.tournament_id = $1
    ORDER BY m.round_no DESC, m.id DESC
  `, [tournamentId]);

  const ranking = await query(`
    SELECT p.id, p.name, p.rating,
      COUNT(m.id) AS wins
    FROM tournament_players tp
    INNER JOIN players p ON p.id = tp.player_id
    LEFT JOIN matches m ON m.winner_id = p.id AND m.tournament_id = tp.tournament_id
    WHERE tp.tournament_id = $1
    GROUP BY p.id, p.name, p.rating
    ORDER BY wins DESC, p.rating DESC, p.name ASC
    LIMIT 3
  `, [tournamentId]);

  return {
    tournament: tournamentResult.rows[0],
    participants: participants.rows,
    availablePlayers: availablePlayers.rows,
    matches: matches.rows,
    ranking: ranking.rows
  };
}

export const actions = {
  addPlayer: async ({ request, params }) => {
    const tournamentId = Number(params.id);
    const form = await request.formData();
    const playerId = Number(form.get('player_id'));

    if (!playerId) {
      return fail(400, { error: 'Please select a player.' });
    }

    await query(
      'INSERT INTO tournament_players (tournament_id, player_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [tournamentId, playerId]
    );

    return { success: 'Player added to tournament.' };
  },

  removePlayer: async ({ request, params }) => {
    const tournamentId = Number(params.id);
    const form = await request.formData();
    const playerId = Number(form.get('player_id'));

    if (!playerId) {
      return fail(400, { error: 'Player id is required.' });
    }

    await query(
      'DELETE FROM tournament_players WHERE tournament_id = $1 AND player_id = $2',
      [tournamentId, playerId]
    );

    return { success: 'Player removed from tournament.' };
  },

  generateMatches: async ({ params }) => {
    const tournamentId = Number(params.id);
    const playersResult = await query(`
      SELECT p.id, p.name
      FROM players p
      INNER JOIN tournament_players tp ON tp.player_id = p.id
      WHERE tp.tournament_id = $1
    `, [tournamentId]);

    if (playersResult.rows.length < 2) {
      return fail(400, { error: 'Minimum 2 players are required to generate matches.' });
    }

    const roundResult = await query(
      'SELECT COALESCE(MAX(round_no), 0) + 1 AS next_round FROM matches WHERE tournament_id = $1',
      [tournamentId]
    );

    const roundNo = Number(roundResult.rows[0].next_round);
    const shuffledPlayers = shufflePlayers(playersResult.rows);

    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      const player1 = shuffledPlayers[i];
      const player2 = shuffledPlayers[i + 1] || null;
      const winner = player2 ? (Math.random() < 0.5 ? player1 : player2) : player1;

      await query(`
        INSERT INTO matches (tournament_id, round_no, player1_id, player2_id, winner_id)
        VALUES ($1, $2, $3, $4, $5)
      `, [tournamentId, roundNo, player1.id, player2?.id || null, winner.id]);
    }

    return { success: `Round ${roundNo} matches generated and winners selected.` };
  },

  clearMatches: async ({ params }) => {
    const tournamentId = Number(params.id);
    await query('DELETE FROM matches WHERE tournament_id = $1', [tournamentId]);
    return { success: 'All match records cleared for this tournament.' };
  }
};
