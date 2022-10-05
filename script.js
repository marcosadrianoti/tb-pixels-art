let colorPaletteArray = [];
if (localStorage.getItem('colorPalette') != null) { // Testa se existe uma paleta de cores armazenada
  colorPaletteArray = JSON.parse(localStorage.getItem('colorPalette'));
}

let myColorPalette = document.getElementById('color-palette');
for (let index = 1; index <= 4; index++) {
  let colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  if (index == 1) { //Sempre preenche o primeiro com black;
    colorDiv.style.backgroundColor = 'rgb(00, 00, 00)';
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
let divLine = document.createElement('div');
divLine.id = 'div-line';
divLine.style.display = 'block'
boardSection.appendChild(divLine);

for (let index = 1; index <= line; index++) {
  for (let index = 1; index <= col; index++) {
    let divPixel = document.createElement('div');
    divPixel.classList.add('pixel');
    divPixel.style.backgroundColor = 'rgb(255, 255, 255)'
    divPixel.style.height= '40px';
    divPixel.style.width= '40px';
    divPixel.style.border= '1px solid black';

    divLine.appendChild(divPixel);
  }
}

let paletteColorDivs = document.getElementsByClassName('color');
// console.log(paletteColorDivs);
myColorPalette.addEventListener('click', choseColor);

let oldSelectedColor = null;
function choseColor(event) {
  if (event.target !== btnRandom){
    oldSelectedColor = document.querySelector('.selected')
    oldSelectedColor.classList.toggle('selected');
    event.target.classList.toggle('selected');
  console.log(paletteColorDivs);
  }
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