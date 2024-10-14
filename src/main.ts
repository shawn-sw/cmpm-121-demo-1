import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// title
const gameName = "Sean's game";
document.title = gameName;
document.body.style.backgroundColor = '#AEB9FF';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.boxSizing = 'border-box';
document.body.style.height = '100vh';
document.body.style.position = 'relative';

// creat a new button element
const button = document.createElement('button');

// set button's attributes and text
button.textContent = '🍄Collect🍄';
button.style.width = 
button.style.border = '0';
button.style.lineHeight = '2.5';
button.style.padding = '0 20px';
button.style.fontSize = '1rem';
button.style.textAlign = 'center';
button.style.color = '#fff';
button.style.textShadow = '1px 1px 1px #000';
button.style.borderRadius = '10px';
button.style.backgroundColor = 'rgba(220, 0, 0, 1)';
button.style.position = 'absolute';
button.style.top = '50%';
button.style.left = '50%';
button.style.transform = 'translate(-50%, -50%)';
button.style.backgroundImage = `
  linear-gradient(
    to top left,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0)
  )`;
button.style.boxShadow = `
  inset 2px 2px 3px rgba(255, 255, 255, 0.6),
  inset -2px -2px 3px rgba(0, 0, 0, 0.6)`;

// Append the button to the body of the document
document.body.appendChild(button);

// add event listener
button.addEventListener('mouseenter', () => {
  button.style.backgroundColor = 'rgba(255, 0, 0, 1)';
});

button.addEventListener('mouseleave', () => {
  button.style.backgroundColor = 'rgba(220, 0, 0, 1)';
});

button.addEventListener('mousedown', () => {
  button.style.boxShadow = `
    inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6)`;
});

button.addEventListener('mouseup', () => {
  button.style.boxShadow = `
    inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6)`;
});

/********************************************************************/

// Counter
let counter: number = 0;

// Create a div to display the counter
const counterDisplay = document.createElement('div');
counterDisplay.textContent = `${counter} mushrooms`;
counterDisplay.style.position = 'absolute';
counterDisplay.style.top = '60%';
counterDisplay.style.left = '50%';
counterDisplay.style.transform = 'translateX(-50%)';
counterDisplay.style.fontSize = '1.5rem';
counterDisplay.style.color = '#fff';
counterDisplay.style.textShadow = '1px 1px 2px #000';
document.body.appendChild(counterDisplay);

// Update the counter when the button is clicked
button.addEventListener('click', () => {
  counter++;
  counterDisplay.textContent = `${counter} mushrooms`;
});


const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
