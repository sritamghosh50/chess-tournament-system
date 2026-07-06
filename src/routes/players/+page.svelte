<script>
  export let data;
  export let form;
</script>

<section class="card">
  <h1>Player Management</h1>
  <p>Create, view, update, and delete chess players.</p>

  {#if form?.success}
    <div class="message">{form.success}</div>
  {/if}

  {#if form?.error}
    <div class="error">{form.error}</div>
  {/if}

  <form method="POST" action="?/create" class="grid">
    <div>
      <label for="name">Player Name</label>
      <input id="name" name="name" placeholder="Enter player name" required />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" placeholder="example@gmail.com" />
    </div>

    <div>
      <label for="rating">Rating</label>
      <input id="rating" name="rating" type="number" value="1200" />
    </div>

    <div style="display: flex; align-items: end;">
      <button type="submit">Add Player</button>
    </div>
  </form>
</section>

<section class="card">
  <h2>All Players</h2>

  {#if data.players.length === 0}
    <p>No player found.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each data.players as player}
          <tr>
            <td>{player.id}</td>
            <td>
              <form method="POST" action="?/update">
                <input type="hidden" name="id" value={player.id} />
                <input name="name" value={player.name} required />
                <input name="email" type="email" value={player.email || ''} placeholder="Email" />
                <input name="rating" type="number" value={player.rating} />
                <button type="submit">Update</button>
              </form>
            </td>
            <td>{player.email || 'Not added'}</td>
            <td>{player.rating}</td>
            <td>
              <form method="POST" action="?/delete" on:submit={() => confirm('Delete this player?')}>
                <input type="hidden" name="id" value={player.id} />
                <button type="submit" class="danger">Delete</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>
