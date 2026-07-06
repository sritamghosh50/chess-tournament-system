import { fail } from '@sveltejs/kit';
import { query } from '$lib/db.server.js';

export async function load() {
  const result = await query('SELECT * FROM players ORDER BY id DESC');
  return { players: result.rows };
}

export const actions = {
  create: async ({ request }) => {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const rating = Number(form.get('rating') || 1200);

    if (!name) {
      return fail(400, { error: 'Player name is required.' });
    }

    await query(
      'INSERT INTO players (name, email, rating) VALUES ($1, $2, $3)',
      [name, email || null, rating]
    );

    return { success: 'Player added successfully.' };
  },

  update: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const rating = Number(form.get('rating') || 1200);

    if (!id || !name) {
      return fail(400, { error: 'Player id and name are required.' });
    }

    await query(
      'UPDATE players SET name = $1, email = $2, rating = $3 WHERE id = $4',
      [name, email || null, rating, id]
    );

    return { success: 'Player updated successfully.' };
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));

    if (!id) {
      return fail(400, { error: 'Player id is required.' });
    }

    await query('DELETE FROM players WHERE id = $1', [id]);
    return { success: 'Player deleted successfully.' };
  }
};
