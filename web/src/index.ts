/*                     DOM VARIABLES                       */

import { Create } from "./services/tic-tac-toe";
import "./assets/bundle.css";
import { IEntity } from "types";
// import { Players } from './types';

const createBtn: HTMLParagraphElement = document.querySelector("#btnCreate")!;
const inputs: HTMLDivElement = document.querySelector("#inputs")!;
const closeBtn: HTMLButtonElement = document.querySelector("#closeBtn")!;
const form: HTMLFormElement = document.forms[0];
const player1Input: HTMLInputElement = document.querySelector("#player1Input")!;
const player2Input: HTMLInputElement = document.querySelector("#player2Input")!;
const player: HTMLDivElement = document.querySelector("#player");
const box: HTMLDivElement = document.querySelector("#box");
const container: HTMLDivElement = document.querySelector(".container");
const body: HTMLBodyElement = document.querySelector("body");
const nextPlayer: HTMLHeadingElement = document.querySelector(".next");
const cells: HTMLDivElement = document.querySelector("#cells");
const backBtn: HTMLButtonElement = document.querySelector("#back-btn");

/*                    API URL                        */
const URL: string = "http://localhost:4000/api/tic-tac-toe";

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

function handlerBackBtn() {
  backBtn.addEventListener("click", () => {
    container.classList.replace("hidden", "grid");
    cells.classList.replace("grid", "hidden");
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
    player.innerHTML += ` <div class="game w-[200px] h-[80px] border-[1px] rounded-[10px] border-white flex gap-[5px] justify-center items-center text-[16px] font-bold tracking-[2px] cursor-pointer">
    <p id="player1">${play1}</p>
    vs
    <p id="player2">${play2}</p>
    </div>`;
    player1Input.value = "";
    player2Input.value = "";

    getPlayers(play1, play2);
  });
}
async function renderCells(data: any) {
  for (let i = 0; i < data.length; i++) {
    const gameDiv = document.createElement("div");
    gameDiv.className = "game w-[200px] h-[80px] border-[1px] rounded-[10px] border-white flex gap-[5px] justify-center items-center text-[16px] font-bold tracking-[2px]";

    const player1Paragraph = document.createElement("p");
    player1Paragraph.id = "player1";
    player1Paragraph.textContent = data[i].player1;
    const vsText = document.createTextNode(" vs ");
    const player2Paragraph = document.createElement("p");
    player2Paragraph.id = "player2";
    player2Paragraph.textContent = data[i].player2;

    gameDiv.appendChild(player1Paragraph);
    gameDiv.appendChild(vsText);
    gameDiv.appendChild(player2Paragraph);
    player.appendChild(gameDiv);
    gameDiv.addEventListener("click", () => {
      console.log(data[i].id);
      container.classList.add("hidden");
      cells.classList.replace("hidden", "grid");
      box.innerHTML = "";
      renderGameCells();
    });
  }
}

function renderGameCells() {
  let currentPlayer: string = "X";
  for (let i = 0; i < 9; i++) {
    const newElement: HTMLSpanElement = document.createElement("span");
    newElement.className = "grid place-items-center w-[200px] h-auto border-[1px] border-white text-[50px] font-bold";
    newElement.addEventListener("click", () => {
      if (newElement.textContent === "") {
        newElement.innerText = currentPlayer;

        currentPlayer = currentPlayer === "X" ? "0" : "X";
        nextPlayer.innerText = `NEXT PLAYER :  ${currentPlayer}`;
      }
    });

    const box: HTMLElement = document.getElementById("box");
    if (box) {
      box.appendChild(newElement);
    }
  }
}

async function getPlayers<T extends string>(player1: T, player2: T) {
  try {
    const response = await Create({ player1, player2 });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function getInfo() {
  const response = await fetch(URL);
  const info = await response.json();

  renderCells(info.data);
  console.log(info.data);
}

/*                    LOGICAL FUNCTIONS                      */

function init() {
  handlerCreateBtn();
  handlerCloseBtn();
  handlerBackBtn();
  renderBoxes();

  getInfo();
}

init();
