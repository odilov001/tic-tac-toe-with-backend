import "./assets/bundle.css";

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

async function renderBoxes() {
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

    const data = {
      player1: play1,
      player2: play2
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      console.log("sending");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  });
}

/*                    LOGICAL FUNCTIONS                      */

function init() {
  handlerCreateBtn();
  handlerCloseBtn();
  renderBoxes();
}

init();
