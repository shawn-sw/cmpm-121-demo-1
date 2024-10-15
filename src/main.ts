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
const mainButton: HTMLButtonElement = document.createElement("button");
mainButton.innerHTML = "Collect 🍄";
mainButton.id = "mainButton";
mainButton.style.fontSize = "100px";
mainButton.style.width = "600px";
gameDiv.append(mainButton);

// add event listener
mainButton.addEventListener("click", () => {
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
        this.button.addEventListener("click", this.purchase.bind(this));
        this.button.style.width = "600px";
    }
    purchase(): void{
      mushroom -= this.cost;
      this.cost *= 1.15;
      globalRate.setRate();
      this.amount++;
    }
}
upgradeButtons.push(new Upgrade("mashroom_A", 10, 0.1));
upgradeButtons.push(new Upgrade("mashroom_B", 100, 2.0));
upgradeButtons.push(new Upgrade("mashroom_C", 1000, 50));
window.requestAnimationFrame(continuousGrowth);

upgradeButtons.forEach((button) => {
    gameDiv.append(button.button);
    button.button.disabled = true;
});

function checkShowUpgrades(): void {
    upgradeButtons.forEach((button) => {
        if (mushroom < button.cost) {
            button.button.disabled = true;
        } else {  
          button.button.disabled = false;
            button.button.innerHTML = `${button.text}<br>(${button.cost.toFixed(2)})<br> Owned:${
              button.amount
            } <br> ${(button.growthRate * button.amount).toFixed(2)}/s`;
        }
    });
    window.requestAnimationFrame(checkShowUpgrades);
}

window.requestAnimationFrame(checkShowUpgrades);
