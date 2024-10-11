import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sean's game";
document.title = gameName;
document.body.style.backgroundColor = 'blue';

// creat a new button element
const button = document.createElement('button');

// set button's attributes and text
button.textContent = '🍄Collect🍄';
button.style.border = '0';
button.style.lineHeight = '2.5';
button.style.padding = '0 20px';
button.style.fontSize = '1rem';
button.style.textAlign = 'center';
button.style.color = '#fff';
button.style.textShadow = '1px 1px 1px #000';
button.style.borderRadius = '10px';
button.style.backgroundColor = 'rgba(220, 0, 0, 1)';
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


const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
