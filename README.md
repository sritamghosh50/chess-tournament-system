# Chess Tournament Management System

A simple SvelteKit + PostgreSQL project for managing chess players, tournaments, random matches, match winners, and final top 3 rankings.

## Features

- Player CRUD
  - Add player
  - View players
  - Update player
  - Delete player
- Tournament CRUD
  - Create tournament
  - View tournaments
  - Update tournament
  - Delete tournament
- Tournament player management
  - Add players to a tournament
  - Remove players from a tournament
- Match system
  - Randomly pair players
  - Randomly select winner
  - Save match results in PostgreSQL
- Ranking
  - Shows 1st, 2nd, and 3rd position based on total wins

## Tech Stack

- Svelte
- SvelteKit
- PostgreSQL
- Node.js
- node-postgres (`pg`)

## Project Setup

### 1. Install Node.js

Download and install Node.js from the official website.

After installing, check:

```bash
node -v
npm -v
```

### 2. Install PostgreSQL

Install PostgreSQL and remember your password.

Create one database named:

```sql
chess_tournament_db
```

### 3. Open project in VS Code

Open this folder in VS Code.

### 4. Install packages

```bash
npm install
```

### 5. Create `.env` file

Copy `.env.example` and rename it to `.env`.

Then update your PostgreSQL password:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/chess_tournament_db
```

### 6. Run database schema

Open PostgreSQL terminal or pgAdmin query tool and run the full code from `schema.sql`.

### 7. Start project

```bash
npm run dev
```

Open this link in browser:

```bash
http://localhost:5173
```

## How to Use

1. Go to `Players`
2. Add players
3. Go to `Tournaments`
4. Create a tournament
5. Open that tournament
6. Add players to the tournament
7. Click `Generate Random Matches`
8. See match results and top 3 ranking

## GitHub Upload Steps

```bash
git init
git add .
git commit -m "Chess tournament management system"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_LINK
git push -u origin main
```

## Demo Video

For assignment submission, record a 2-3 minute video showing:

1. Project running in browser
2. Adding a player
3. Creating a tournament
4. Adding players to tournament
5. Generating random matches
6. Showing final ranking

