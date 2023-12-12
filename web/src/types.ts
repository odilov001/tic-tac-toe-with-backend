export namespace IEntity {
  export type Player = "X" | "O";
  export type Cell = Player | null;
  export type Board = Cell[];

  export namespace Game {
    export interface Main {
      id: string;
      player1: string;
      player2: string;
      board: Board;
      nextPlayer: Player;
      winner: Player | null;
    }
    export interface Mini extends Pick<Main, "id" | "player1" | "player2"> {}
  }
}
export namespace IForm {
  export interface Create extends Pick<IEntity.Game.Main, "player1" | "player2"> {}
  export interface Update extends Pick<IEntity.Game.Mini, "id"> {}
  export interface Players {
    player1: string;
    player2: string;
  }
}
