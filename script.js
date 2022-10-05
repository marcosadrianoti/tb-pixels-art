let colorPaletteArray = [];
if (localStorage.getItem('colorPalette') != null) { // Testa se existe uma paleta de cores armazenada
  colorPaletteArray = JSON.parse(localStorage.getItem('colorPalette'));
}

let selectedColor = 'rgb(00, 00, 00)'
let myColorPalette = document.getElementById('color-palette');
for (let index = 1; index <= 4; index++) {
  let colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  if (index == 1) { //Sempre preenche o primeiro com black;
    colorDiv.style.backgroundColor = selectedColor;
    colorDiv.classList.add('selected');
  } else if (localStorage.getItem('colorPalette') == null) { // Se não tem nada armazenado vai gerar novas cores
    while (colorDiv.style.backgroundColor == '') {
      colorDiv.style.backgroundColor = randomHex(); // Atribui uma cor aleatória
    }
    colorPaletteArray.push(colorDiv.style.backgroundColor); //Grava num array as novas cores
  } else { // Usa as cores que, por ventura, já estão armazenadas
    colorDiv.style.backgroundColor = colorPaletteArray[index - 2];
  }
  myColorPalette.appendChild(colorDiv);
}
storageColorPalette(colorPaletteArray);

let btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerText = 'Cores aleatórias'
myColorPalette.appendChild(btnRandom);
btnRandom.addEventListener('click', randomColors);

let col = 5;
let line = 5;

let boardSection = document.getElementById('pixel-board');
let btnClear = document.createElement('button'); //Cria botão
btnClear.id = 'clear-board';
btnClear.innerText = 'Limpar'
boardSection.appendChild(btnClear);
btnClear.addEventListener('click', clearBoard);
let divLine = document.createElement('div'); //Cria div para receber pixels
divLine.id = 'div-line';
divLine.style.display = 'block'
boardSection.appendChild(divLine);

for (let index = 1; index <= line; index++) {
  for (let index = 1; index <= col; index++) {
    let divPixel = document.createElement('div');
    divPixel.classList.add('pixel');
    divPixel.style.backgroundColor = 'rgb(255, 255, 255)'
    divPixel.style.height = '40px';
    divPixel.style.width = '40px';
    divPixel.style.border = '1px solid black';

    divLine.appendChild(divPixel);
  }
}

myColorPalette.addEventListener('click', choseColor);
divLine.addEventListener('click', apllyColor);

let oldSelectedColor = null;
let allPixels = document.querySelectorAll('.pixel');
// console.log(allPixels);
function clearBoard() {
  for (const pixel of allPixels) {
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

function choseColor(event) {
  let atualColor = event.target;
  if (atualColor !== btnRandom) {
    oldSelectedColor = document.querySelector('.selected')
    oldSelectedColor.classList.toggle('selected');
    atualColor.classList.toggle('selected');
  }
}
function apllyColor(event) {
  let pixelAtual = event.target;
  selectedColor = document.querySelector('.selected').style.backgroundColor;
  pixelAtual.style.backgroundColor = selectedColor;
}
function randomColors() {
  let colorDivs = document.getElementsByClassName('color');
  colorPaletteArray = [];
  for (let index = 1; index <= 3; index++) {
    colorDivs[index].style.backgroundColor = randomHex();
    colorPaletteArray.push(colorDivs[index].style.backgroundColor); //Grava num array as novas cores
  }
  storageColorPalette(colorPaletteArray);
}
function randomHex() {
  return '#' + parseInt(Math.random() * 100) + parseInt(Math.random() * 100) + parseInt(Math.random() * 100);
}
function storageColorPalette(arrayColors) {
  localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
}