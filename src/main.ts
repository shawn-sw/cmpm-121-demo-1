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
  const elapsed: number = now - start;
    incrementMushroom(globalGrowth.growth * (elapsed / 1000));
    start = now;
    window.requestAnimationFrame(continuousGrowth);
  }
  window.requestAnimationFrame(continuousGrowth);


interface Item {
  name: string;
  price: number;
  growth: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Mushroom_A", price: 10, growth: 0.1, description:"pickup mushroom a"},
  { name: "Mushroom_B", price: 100, growth: 2, description:"pickup mushroom b" },
  { name: "Mushroom_C", price: 1000, growth: 50, description:"pickup mushroom c" },
  { name: "Mushroom_D", price: 10000, growth: 1000, description:"pickup mushroom d" },
  { name: "Mushroom_E", price: 100000, growth: 20000, description:"pickup mushroom e" },
  { name: "Mushroom_F", price: 1000000, growth: 500000, description:"pickup mushroom f" },
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
    public description: string;
    private tips: HTMLDivElement;
    public button: HTMLButtonElement;
  
    constructor(item: Item) {
        this.name = item.name;
        this.price = item.price;
        this.amount = 0;
        this.growth = item.growth;
        this.description = item.description;
        this.button = document.createElement("button");
        this.updateButtonText();
        this.button.addEventListener("click", this.purchase.bind(this));
        this.button.style.width = "200px";

        this.tips = document.createElement("div");
        this.tips.classList.add("tips");
        this.tips.textContent = this.description;
      
        this.button.addEventListener("mouseover", this.showTips.bind(this));
        this.button.addEventListener("mouseout", this.hideTips.bind(this));
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

    showTips(event: MouseEvent): void {
      const tooltipOffset = 10;
      this.tips.style.left = `${event.clientX + tooltipOffset}px`;
      this.tips.style.top = `${event.clientY + tooltipOffset}px`;
      document.body.appendChild(this.tips);
    }
  
    hideTips(): void {
      if (this.tips.parentElement) {
        this.tips.parentElement.removeChild(this.tips);
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
