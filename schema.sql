DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS tournament_players;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS players;

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120),
  rating INTEGER DEFAULT 1200,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  place VARCHAR(150),
  start_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament_players (
  tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
  player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tournament_id, player_id)
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
  round_no INTEGER DEFAULT 1,
  player1_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  player2_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  winner_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO players (name, email, rating) VALUES
('Rahul Sharma', 'rahul@gmail.com', 1300),
('Priya Das', 'priya@gmail.com', 1250),
('Amit Kumar', 'amit@gmail.com', 1400),
('Sneha Patra', 'sneha@gmail.com', 1180),
('Rohan Singh', 'rohan@gmail.com', 1320),
('Ananya Mishra', 'ananya@gmail.com', 1280);

INSERT INTO tournaments (title, place, start_date) VALUES
('College Chess Championship', 'Bangalore', CURRENT_DATE);

INSERT INTO tournament_players (tournament_id, player_id)
SELECT 1, id FROM players;
