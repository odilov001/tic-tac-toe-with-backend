import { IEntity } from "types";

export const Mini = ({ id, player1, player2 }: IEntity.Game.Main): IEntity.Game.Mini => ({
  id,
  player1,
  player2
});
