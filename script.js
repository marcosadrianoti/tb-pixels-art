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

let sectionColorPalette = document.querySelector('#color-palette');
let btnClear = document.createElement('button'); //Cria botão para limpar
btnClear.id = 'clear-board';
btnClear.innerText = 'Limpar'
sectionColorPalette.insertAdjacentElement('afterend', btnClear);
btnClear.addEventListener('click', clearBoard);

let btnInputSize = document.createElement('button'); //Cria botão para o tamanho
btnInputSize.id = 'generate-board';
btnInputSize.innerText = 'VQV'
sectionColorPalette.insertAdjacentElement('afterend', btnInputSize);
btnInputSize.addEventListener('click', sizeBoard);

let inputSize = document.createElement('input'); //Cria input para o tamanho
inputSize.id = 'board-size';
inputSize.type = "number";
inputSize.min = 1;
inputSize.style.width = '40px'
sectionColorPalette.insertAdjacentElement('afterend', inputSize);


let boardSection = document.getElementById('pixel-board');
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
let paintedBoard = {};
let allPixels = document.querySelectorAll('.pixel');
if (localStorage.getItem('pixelBoard') !== null) { // Se tem um desenho gravado então ele será carregado
  paintedBoard = JSON.parse(localStorage.getItem('pixelBoard'))
  for (let index = 0; index < allPixels.length; index++) {
    allPixels[index].style.backgroundColor = paintedBoard[index];
  }
}
myColorPalette.addEventListener('click', choseColor);
divLine.addEventListener('click', apllyColor);

function sizeBoard() {
  if (inputSize.value == '' || inputSize.value <= 0) {
    alert('Board inválido!')
  } else {
    for (const iterator of allPixels) {
      iterator.parentNode.removeChild(iterator);
    }
    for (let index = 1; index <= inputSize.value; index++) {
      for (let index = 1; index <= inputSize.value; index++) {
        let divPixel = document.createElement('div');
        divPixel.classList.add('pixel');
        divPixel.style.backgroundColor = 'rgb(255, 255, 255)'
        divPixel.style.height = '40px';
        divPixel.style.width = '40px';
        divPixel.style.border = '1px solid black';

        divLine.appendChild(divPixel);
      }
    }
    divLine.style.width = 40 * inputSize.value + 20 + 'px';
    allPixels = document.querySelectorAll('.pixel');
    clearBoard();
    // console.log('entrou', inputSize.value);
  }
}

let oldSelectedColor = null;
function clearBoard() {
  for (const pixel of allPixels) {
    pixel.style.backgroundColor = 'rgb(255, 255, 255)';
  }
  saveBoard();
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
  saveBoard();
}
function saveBoard() {
  paintedBoard = {};
  for (let index = 0; index < allPixels.length; index++) {
    paintedBoard[index] = allPixels[index].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(paintedBoard));
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