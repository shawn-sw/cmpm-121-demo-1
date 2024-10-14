import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mushroom Forest";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// adds counter
const gameDiv: HTMLDivElement = document.createElement("div");
gameDiv.id = "gameCounter";
app.append(gameDiv);

const count: HTMLDivElement = document.createElement("div");
count.id = "count";
count.innerHTML = "Count: 0<br><br>";
count.style.textAlign = "center";
gameDiv.append(count);
let mushroom = 0;

// adds button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "Collect 🍄";
bookButton.id = "bookButton";
gameDiv.append(bookButton);

// add event listeners to the button
bookButton.addEventListener("click", () => {
  mushroom++;
  count.innerHTML = `Count: ${mushroom}<br><br>`;
});
