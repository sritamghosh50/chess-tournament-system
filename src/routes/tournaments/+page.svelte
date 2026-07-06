<script>
  export let data;
  export let form;

  function showDate(dateValue) {
    if (!dateValue) return '';
    return new Date(dateValue).toISOString().slice(0, 10);
  }
</script>

<section class="card">
  <h1>Tournament Management</h1>
  <p>Create, view, update, and delete tournaments.</p>

  {#if form?.success}
    <div class="message">{form.success}</div>
  {/if}

  {#if form?.error}
    <div class="error">{form.error}</div>
  {/if}

  <form method="POST" action="?/create" class="grid">
    <div>
      <label for="title">Tournament Name</label>
      <input id="title" name="title" placeholder="Example: City Chess Cup" required />
    </div>

    <div>
      <label for="place">Place</label>
      <input id="place" name="place" placeholder="Bangalore" />
    </div>

    <div>
      <label for="start_date">Start Date</label>
      <input id="start_date" name="start_date" type="date" />
    </div>

    <div style="display: flex; align-items: end;">
      <button type="submit">Create Tournament</button>
    </div>
  </form>
</section>

<section class="card">
  <h2>All Tournaments</h2>

  {#if data.tournaments.length === 0}
    <p>No tournament found.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tournament</th>
          <th>Players</th>
          <th>Open</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each data.tournaments as tournament}
          <tr>
            <td>{tournament.id}</td>
            <td>
              <form method="POST" action="?/update">
                <input type="hidden" name="id" value={tournament.id} />
                <input name="title" value={tournament.title} required />
                <input name="place" value={tournament.place || ''} placeholder="Place" />
                <input name="start_date" type="date" value={showDate(tournament.start_date)} />
                <button type="submit">Update</button>
              </form>
            </td>
            <td>{tournament.total_players}</td>
            <td><a class="btn" href="/tournaments/{tournament.id}">Open</a></td>
            <td>
              <form method="POST" action="?/delete">
                <input type="hidden" name="id" value={tournament.id} />
                <button type="submit" class="danger">Delete</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>
