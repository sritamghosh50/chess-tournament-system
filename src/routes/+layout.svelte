<script>
  let year = new Date().getFullYear();
</script>

<nav class="nav">
  <a href="/" class="brand">Chess Tournament</a>
  <div>
    <a href="/players">Players</a>
    <a href="/tournaments">Tournaments</a>
  </div>
</nav>

<main class="page">
  <slot />
</main>

<footer>
  <p>© {year} Chess Tournament Management System</p>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6fb;
    color: #1f2937;
  }

  .nav {
    background: #111827;
    color: white;
    padding: 16px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    font-size: 22px;
    font-weight: bold;
  }

  .nav a {
    color: white;
    text-decoration: none;
    margin-left: 18px;
  }

  .nav a:hover {
    text-decoration: underline;
  }

  .page {
    max-width: 1100px;
    margin: 30px auto;
    padding: 0 18px;
  }

  footer {
    text-align: center;
    padding: 20px;
    color: #6b7280;
  }

  :global(.card) {
    background: white;
    padding: 22px;
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
  }

  :global(.grid) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 18px;
  }

  :global(input), :global(select) {
    width: 100%;
    padding: 10px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    margin-top: 6px;
    box-sizing: border-box;
  }

  :global(label) {
    font-size: 14px;
    font-weight: 600;
  }

  :global(button), :global(.btn) {
    border: none;
    background: #2563eb;
    color: white;
    padding: 10px 14px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
  }

  :global(button:hover), :global(.btn:hover) {
    background: #1d4ed8;
  }

  :global(.danger) {
    background: #dc2626;
  }

  :global(.danger:hover) {
    background: #b91c1c;
  }

  :global(.secondary) {
    background: #475569;
  }

  :global(.secondary:hover) {
    background: #334155;
  }

  :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
  }

  :global(th), :global(td) {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    vertical-align: top;
  }

  :global(th) {
    background: #f8fafc;
  }

  :global(.actions) {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  :global(.message) {
    background: #ecfdf5;
    border: 1px solid #bbf7d0;
    color: #166534;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  :global(.error) {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
</style>
