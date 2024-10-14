import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mushroom Forest";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// adds button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "Collect 🍄";
bookButton.id = "bookButton";
