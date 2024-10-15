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
  globalGrowth.setGrowth();
}

let start = Date.now();
function continuousGrowth() {
  const now = Date.now();
  if (now - start > (1 / 60) * 1000) {
    incrementMushroom(globalGrowth.growth);
    window.requestAnimationFrame(continuousGrowth);
    start = now;
  }else{
    window.requestAnimationFrame(continuousGrowth);
  }
}

interface Item {
  name: string;
  price: number;
  growth: number;
}

const availableItems: Item[] = [
  { name: "Mushroom_A", price: 10, growth: 0.1 },
  { name: "Mushroom_B", price: 100, growth: 2 },
  { name: "Mushroom_C", price: 1000, growth: 50 },
];

const upgradeButtons: Upgrade[] = [];
const globalGrowth = {
    growth: 0,
    setGrowth() {
        const growthArr = upgradeButtons.map((button) => {
            return button.amount * button.growth;
        });
        this.growth = growthArr.reduce((a, b) => a + b, 0);
    }
}

class Upgrade {
    public name: string;
    public price: number;
    public growth: number;
    public amount: number;
    public button: HTMLButtonElement;
  
    constructor(item: Item) {
        this.name = item.name;
        this.price = item.price;
        this.amount = 0;
        this.growth = item.growth;
        this.button = document.createElement("button");
        this.updateButtonText();
        this.button.addEventListener("click", this.purchase.bind(this));
        this.button.style.width = "200px";
    }
  
    purchase(): void{
      if (mushroom >= this.price) {
      mushroom -= this.price;
      this.amount++;
      this.price *= 1.15;
      globalGrowth.setGrowth();
      this.updateButtonText();
      }
  }
  updateButtonText(): void {
    this.button.innerHTML = `${this.name}<br>
    Price: ${this.price.toFixed(2)}<br>
    Owned: ${this.amount}<br>
    ${(this.growth * this.amount).toFixed(2)}/s`;
  }
} 

availableItems.forEach((item) => {
  const upgrade = new Upgrade(item);
  upgradeButtons.push(upgrade);
  gameDiv.append(upgrade.button);
  upgrade.button.disabled = true;
});

function checkShowUpgrades(): void {
    upgradeButtons.forEach((button) => {
      button.button.disabled = mushroom < button.price;
      button.updateButtonText();
    });
    window.requestAnimationFrame(checkShowUpgrades);
}

window.requestAnimationFrame(continuousGrowth);
window.requestAnimationFrame(checkShowUpgrades);
