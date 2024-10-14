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

const globalRate = {
  rate: 0,
  setRate() {
    const rateArr = upgradeButtons.map(
      (button) => button.amount * button.growthRate
    );
    this.rate = rateArr.reduce((a, b) => a + b, 0);
  },
};

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
    this.button.innerHTML = `${this.text}<br>(${this.cost} mushrooms)`;
    this.button.addEventListener("click", () => {
      if (mushroom >= this.cost) {
        mushroom -= this.cost;
        this.purchase();
        globalRate.setRate();
        updateMushroomDisplay();
        checkShowUpgrades();
      }
    });
  }
  purchase(): void {
    this.amount++;
  }
}

// add button
const bookButton: HTMLButtonElement = document.createElement("button");
bookButton.innerHTML = "Collect 🍄";
bookButton.id = "bookButton";
gameDiv.append(bookButton);
// add event listener
bookButton.addEventListener("click", () => {
  incrementMushroom(1); // click +1
  
const upgradeButtons: Upgrade[] = [];
upgradeButtons.push(new Upgrade("Baby Bella", 10, 1 / 60));
upgradeButtons.push(new Upgrade("shiitake", 100, 10 / 60));
upgradeButtons.push(new Upgrade("Chanterelle", 1000, 100 / 60));

upgradeButtons.forEach((button) => {
  gameDiv.append(button.button);
  button.button.hidden = true;
});

function checkShowUpgrades(): void {
  upgradeButtons.forEach((button) => {
    button.button.hidden = mushroom < button.cost;
  });
  window.requestAnimationFrame(checkShowUpgrades);
}

window.requestAnimationFrame(checkShowUpgrades);

function updateMushroomDisplay(): void {
  count.innerHTML = `Mushroom: ${mushroom.toFixed(2)}<br><br>`;
}

let lastTime = performance.now();

function continuousGrowth(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  mushroom += globalRate.rate * deltaTime; 
  updateMushroomDisplay();
  lastTime = currentTime; 
  window.requestAnimationFrame(continuousGrowth); 
}

window.requestAnimationFrame(continuousGrowth);
