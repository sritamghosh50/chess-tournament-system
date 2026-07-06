<script>
  export let data;
</script>

<section class="card hero">
  <h1>Chess Tournament Management System</h1>
  <p>
    Manage players, create tournaments, add players, generate random matches,
    save winners, and view final top 3 rankings.
  </p>
  <div class="actions">
    <a href="/players" class="btn">Manage Players</a>
    <a href="/tournaments" class="btn secondary">Manage Tournaments</a>
  </div>
</section>

<section class="grid">
  <div class="card stat">
    <h2>{data.playerCount}</h2>
    <p>Total Players</p>
  </div>
  <div class="card stat">
    <h2>{data.tournamentCount}</h2>
    <p>Total Tournaments</p>
  </div>
  <div class="card stat">
    <h2>{data.matchCount}</h2>
    <p>Total Matches</p>
  </div>
</section>

<section class="card">
  <h2>Recent Tournaments</h2>

  {#if data.latestTournaments.length === 0}
    <p>No tournament created yet.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Place</th>
          <th>Date</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        {#each data.latestTournaments as tournament}
          <tr>
            <td>{tournament.title}</td>
            <td>{tournament.place || 'Not added'}</td>
            <td>{tournament.start_date ? new Date(tournament.start_date).toLocaleDateString() : 'Not added'}</td>
            <td><a class="btn" href="/tournaments/{tournament.id}">View</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<style>
  .hero h1 {
    margin-top: 0;
    font-size: 34px;
  }

  .hero p {
    max-width: 760px;
    line-height: 1.6;
  }

  .stat h2 {
    font-size: 34px;
    margin: 0;
  }

  .stat p {
    margin-bottom: 0;
    color: #64748b;
  }
</style>
