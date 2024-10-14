import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mushroom Forest";
document.title = gameName;

// 创建标题
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// 创建游戏计数器容器
const gameDiv: HTMLDivElement = document.createElement("div");
gameDiv.id = "gameCounter";
app.append(gameDiv);

// 创建计数显示区域
const count: HTMLDivElement = document.createElement("div");
count.id = "count";
count.innerHTML = "Count: 0<br><br>";
count.style.textAlign = "center";
gameDiv.append(count);

// mushroom count
let mushroom = 0;

// add button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "Collect 🍄";
bookButton.id = "bookButton";
gameDiv.append(bookButton);

// add event listener
bookButton.addEventListener("click", () => {
  incrementMushroom(1); // click +1
});

// add function to update mushroom number
function incrementMushroom(val: number = 1) {
  mushroom += val;
  count.innerHTML = `Count: ${mushroom.toFixed(2)}<br><br>`;
}

// increase by time
setInterval(() => {
  incrementMushroom(1 / 60);
}, 1000 / 60);
