import { fail } from '@sveltejs/kit';
import { query } from '$lib/db.server.js';

export async function load() {
  const result = await query(`
    SELECT t.*,
      COUNT(tp.player_id) AS total_players
    FROM tournaments t
    LEFT JOIN tournament_players tp ON tp.tournament_id = t.id
    GROUP BY t.id
    ORDER BY t.id DESC
  `);

  return { tournaments: result.rows };
}

export const actions = {
  create: async ({ request }) => {
    const form = await request.formData();
    const title = String(form.get('title') || '').trim();
    const place = String(form.get('place') || '').trim();
    const startDate = String(form.get('start_date') || '').trim();

    if (!title) {
      return fail(400, { error: 'Tournament name is required.' });
    }

    await query(
      'INSERT INTO tournaments (title, place, start_date) VALUES ($1, $2, $3)',
      [title, place || null, startDate || null]
    );

    return { success: 'Tournament created successfully.' };
  },

  update: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));
    const title = String(form.get('title') || '').trim();
    const place = String(form.get('place') || '').trim();
    const startDate = String(form.get('start_date') || '').trim();

    if (!id || !title) {
      return fail(400, { error: 'Tournament id and name are required.' });
    }

    await query(
      'UPDATE tournaments SET title = $1, place = $2, start_date = $3 WHERE id = $4',
      [title, place || null, startDate || null, id]
    );

    return { success: 'Tournament updated successfully.' };
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));

    if (!id) {
      return fail(400, { error: 'Tournament id is required.' });
    }

    await query('DELETE FROM tournaments WHERE id = $1', [id]);
    return { success: 'Tournament deleted successfully.' };
  }
};
