import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

import { games } from "./db";
import { IEntity } from "./types";
import * as Mappers from "./mappers";
import { checkWinner } from "./utils";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tic-tac-toe", (req, res) => {
  const miniGames = games.map(Mappers.Mini);

  res.send({ data: miniGames, message: null });
});

app.get("/api/tic-tac-toe/:gameId", (req, res) => {
  const { gameId } = req.params;

  const game = games.find((game) => game.id === gameId);

  if (!game) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });

  res.send({ data: game, message: null });
});

app.post("/api/tic-tac-toe", (req, res) => {
  const { player1 = "", player2 = "" } = req.body as Pick<IEntity.Game.Main, "player1" | "player2">;

  const game: IEntity.Game.Main = {
    id: faker.string.uuid(),
    board: new Array(9).fill(null),
    winner: null,
    player1,
    player2,
    nextPlayer: "X"
  };

  games.push(game);

  res.send(game);
});

app.post("/api/tic-tac-toe/move/:gameId", (req, res) => {
  const { gameId } = req.params;
  const { cellIdx, player } = req.body as { cellIdx: number; player: IEntity.Player };

  const gameIdx = games.findIndex((game) => game.id === gameId);
  if (gameIdx === -1) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });

  const game = games[gameIdx];

  if (game.winner) return res.status(400).send({ data: game, message: "Game already finished" });
  if (game.board[cellIdx]) return res.status(400).send({ data: null, message: "This cell is already occupied" });
  if (game.nextPlayer !== player) return res.status(400).send({ data: null, message: "It's not your turn now" });

  game.board[cellIdx] = player;
  game.nextPlayer = player === "X" ? "O" : "X";
  game.winner = checkWinner(game.board);

  res.send({ data: game, message: null });
});

app.put("/api/tic-tac-toe/reset/:gameId", (req, res) => {
  const { gameId } = req.params;
  const gameIdx = games.findIndex((game) => game.id === gameId);

  if (gameIdx === -1) return res.status(404).send({ data: null, message: `Game not found with id ${gameId}` });

  games[gameIdx] = {
    ...games[gameIdx],
    winner: null,
    board: new Array(9).fill(null),
    nextPlayer: "X"
  };

  res.send({ data: games[gameIdx], message: "Successfully game restarted 🥶" });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
