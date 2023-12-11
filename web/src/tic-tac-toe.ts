import { IEntity, IForm } from "types";
import { http } from "./link";

export async function List() {
  const res = await http.get(`/tic-tac-toe`);
  const tic_tac: IEntity.Game.Main = await res.json();
  return tic_tac;
}

export async function Single(gameId: string) {
  const res = await http.get(`/tic-tac-toe/${gameId}`);
  const tic_tac: IEntity.Game.Main = await res.json();
  return tic_tac;
}

export async function Create(values: IForm.Create) {
  const res = await http.post("/tic-tac-toe", JSON.stringify(values));
  const tic_tac: IEntity.Game.Main = await res.json();

  return tic_tac;
}

export async function Update({ id, ...body }: IForm.Update) {
  const res = await http.patch(`/tic-tac-toe/${id}`, JSON.stringify(body));
  const tic_tac: IEntity.Game.Main = await res.json();

  return tic_tac;
}
