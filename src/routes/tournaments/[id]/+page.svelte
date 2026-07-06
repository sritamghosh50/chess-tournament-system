<script>
  export let data;
  export let form;

  function showDate(dateValue) {
    if (!dateValue) return 'Not added';
    return new Date(dateValue).toLocaleDateString();
  }

  function position(index) {
    if (index === 0) return '1st';
    if (index === 1) return '2nd';
    if (index === 2) return '3rd';
    return `${index + 1}th`;
  }
</script>

<section class="card">
  <a href="/tournaments" class="btn secondary">Back</a>
  <h1>{data.tournament.title}</h1>
  <p><b>Place:</b> {data.tournament.place || 'Not added'}</p>
  <p><b>Date:</b> {showDate(data.tournament.start_date)}</p>

  {#if form?.success}
    <div class="message">{form.success}</div>
  {/if}

  {#if form?.error}
    <div class="error">{form.error}</div>
  {/if}
</section>

<section class="grid">
  <div class="card">
    <h2>Add Players</h2>

    {#if data.availablePlayers.length === 0}
      <p>All players are already added or no players available.</p>
    {:else}
      <form method="POST" action="?/addPlayer">
        <label for="player_id">Select Player</label>
        <select id="player_id" name="player_id" required>
          <option value="">-- Choose player --</option>
          {#each data.availablePlayers as player}
            <option value={player.id}>{player.name} - Rating {player.rating}</option>
          {/each}
        </select>
        <br /><br />
        <button type="submit">Add Player</button>
      </form>
    {/if}
  </div>

  <div class="card">
    <h2>Match System</h2>
    <p>Click the button below to randomly pair players and randomly select winners.</p>

    <div class="actions">
      <form method="POST" action="?/generateMatches">
        <button type="submit">Generate Random Matches</button>
      </form>

      <form method="POST" action="?/clearMatches">
        <button type="submit" class="danger">Clear Matches</button>
      </form>
    </div>
  </div>
</section>

<section class="card">
  <h2>Players in this Tournament</h2>

  {#if data.participants.length === 0}
    <p>No player added to this tournament.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each data.participants as player}
          <tr>
            <td>{player.name}</td>
            <td>{player.email || 'Not added'}</td>
            <td>{player.rating}</td>
            <td>
              <form method="POST" action="?/removePlayer">
                <input type="hidden" name="player_id" value={player.id} />
                <button type="submit" class="danger">Remove</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<section class="card">
  <h2>Final Ranking - Top 3</h2>

  {#if data.ranking.length === 0}
    <p>No ranking available.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Rating</th>
          <th>Total Wins</th>
        </tr>
      </thead>
      <tbody>
        {#each data.ranking as player, index}
          <tr>
            <td><b>{position(index)}</b></td>
            <td>{player.name}</td>
            <td>{player.rating}</td>
            <td>{player.wins}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>

<section class="card">
  <h2>Match Results</h2>

  {#if data.matches.length === 0}
    <p>No matches generated yet.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>Winner</th>
          <th>Played At</th>
        </tr>
      </thead>
      <tbody>
        {#each data.matches as match}
          <tr>
            <td>{match.round_no}</td>
            <td>{match.player1_name || 'Deleted player'}</td>
            <td>{match.player2_name || 'Bye'}</td>
            <td><b>{match.winner_name || 'Deleted player'}</b></td>
            <td>{new Date(match.played_at).toLocaleString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</section>
