import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mushroom Forest";
document.title = gameName;

// add title
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// add counter
const gameDiv: HTMLDivElement = document.createElement("div");
gameDiv.id = "gameCounter";
app.append(gameDiv);

// add count display
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

let start = performance.now();
function continuousGrowth() {
  const now = performance.now();
  if (now - start > (1 / 60) * 1000) {
    incrementMushroom(globalRate.rate);
    window.requestAnimationFrame(continuousGrowth);
    start = now;
  }else{
    window.requestAnimationFrame(continuousGrowth);
  }
}

const upgradeButtons: Upgrade[] = [];
const globalRate = {
    rate: 0,
    setRate() {
        const rateArr = upgradeButtons.map((button) => {
            return button.amount * button.growthRate;
        });
        this.rate = rateArr.reduce((a, b) => a + b);
    }
}

class Upgrade {
    public text: string;
    public cost: number;
    public growthRate: number;
    public amount: number;
    public button: HTMLButtonElement;
    constructor(text: string, cost: number, growthRate: number) {
        this.text = text;
        this.cost = cost;
        this.amount = 0;
        this.growthRate = growthRate;
        this.button = document.createElement("button");
        this.button.innerHTML = `${this.text}<br>(${this.cost})`;
        this.button.addEventListener("click", () => {
            mushroom -= this.cost;
            this.purchase();
            globalRate.setRate();
        });
    }
    purchase(): void{
        this.amount++;
    }
}
upgradeButtons.push(new Upgrade("mashroom_A", 10, 0.1));
upgradeButtons.push(new Upgrade("mashroom_B", 100, 2.0));
upgradeButtons.push(new Upgrade("mashroom_C", 1000, 50));
window.requestAnimationFrame(continuousGrowth);

upgradeButtons.forEach((button) => {
    gameDiv.append(button.button);
    button.button.hidden = true;
});

let hidCount = 0;
function checkShowUpgrades(): void {
    upgradeButtons.forEach((button) => {
        if (mushroom < button.cost && hidCount == 0) {
            button.button.hidden = true;
        } else {  
          button.button.hidden = false;
          hidCount = 1;
            button.button.innerHTML = `${button.text}<br>(${button.cost})<br> Owned:${
              button.amount
            } @ ${button.growthRate * button.amount}/s`;
        }
    });
    window.requestAnimationFrame(checkShowUpgrades);
}

window.requestAnimationFrame(checkShowUpgrades);
