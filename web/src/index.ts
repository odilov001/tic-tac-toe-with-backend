import { Create, Single } from "./services/tic-tac-toe";
import "./assets/bundle.css";
import { IForm } from "types";

/*                     DOM VARIABLES                       */

const createBtn: HTMLParagraphElement = document.querySelector("#btnCreate")!;
const inputs: HTMLDivElement = document.querySelector("#inputs")!;
const closeBtn: HTMLButtonElement = document.querySelector("#closeBtn")!;
const form: HTMLFormElement = document.forms[0];
const player1Input: HTMLInputElement = document.querySelector("#player1Input")!;
const player2Input: HTMLInputElement = document.querySelector("#player2Input")!;
const player: HTMLDivElement = document.querySelector("#player");

/*                    API URL                        */
const url: string = "http://localhost:4000/api/tic-tac-toe";

/*                    HANDLER FUNCTION                       */

function handlerCreateBtn() {
  createBtn.addEventListener("click", () => {
    inputs.classList.replace("hidden", "grid");
  });
}

function handlerCloseBtn() {
  closeBtn.addEventListener("click", () => {
    inputs.classList.replace("grid", "hidden");
    // console.log("hello");
  });
}

/*                     UI FUNCTIONS                      */

function renderBoxes() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const play1: string = player1Input.value;
    const play2: string = player2Input.value;
    if (player1Input.value === " " || player2Input.value === "") return;
    inputs.classList.replace("grid", "hidden");
    player.innerHTML += ` <div class="game w-[200px] h-[80px] border-[1px] rounded-[10px] border-white flex gap-[5px] justify-center items-center text-[16px] font-bold tracking-[2px]">
    <p id="player1">${play1}</p>
    vs
    <p id="player2">${play2}</p>
    </div>`;
    player1Input.value = "";
    player2Input.value = "";
    // getPlayers(play1, play2);
    handlerGetPlayersId();
  });
}

function handlerGetPlayersId() {
  const gameAll: NodeListOf<HTMLDivElement> = document.querySelectorAll(".game");
  console.log(gameAll);

  gameAll.forEach((item) => {
    item.addEventListener("click", () => {
      // console.log(item.id);
      const clickedPlayer1 = item.querySelector("#player1").textContent;
      const clickedPlayer2 = item.querySelector("#player2").textContent;
      console.log("Clicked Players:", clickedPlayer1, clickedPlayer2);

      getPlayers(clickedPlayer1, clickedPlayer1, item.id);
    });
  });
}

async function getPlayers(player1: any, player2: any, id: string) {
  try {
    const response = await Create({ player1, player2 });

    console.log(response);
    const getId = response.id;
    console.log(getId);
    console.log(response.nextPlayer);
  } catch (err) {
    console.log(err);
  }
}

/*                    LOGICAL FUNCTIONS                      */

function init() {
  handlerCreateBtn();
  handlerCloseBtn();
  renderBoxes();
  // handlerGetPlayersId();
}

init();
