let colorPaletteArray = [];
if (localStorage.getItem('colorPalette') != null){ // Testa se existe uma paleta de cores armazenada
  colorPaletteArray = JSON.parse(localStorage.getItem('colorPalette'));
}

let myColorPalette = document.getElementById('color-palette');
for (let index = 1; index <= 4; index++) {
  let colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  if (index == 1) { //Sempre preenche o primeiro com black;
    colorDiv.style.backgroundColor = 'rgb(00, 00, 00)';
  } else if(localStorage.getItem('colorPalette') == null){ // Se não tem nada armazenado vai gerar novas cores
    while (colorDiv.style.backgroundColor == '') {
      colorDiv.style.backgroundColor = randomHex(); // Atribui uma cor aleatória
    }
    colorPaletteArray.push(colorDiv.style.backgroundColor); //Grava num array as novas cores
  }else{ // Usa as cores que, por ventura, já estão armazenadas
    // console.log(index, colorPaletteArray);
    colorDiv.style.backgroundColor = colorPaletteArray[index - 2];
  }
  myColorPalette.appendChild(colorDiv);
}
// console.log(colorPalette);
storageColorPalette(colorPaletteArray);

let btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerText = 'Cores aleatórias'
myColorPalette.appendChild(btnRandom);
btnRandom.addEventListener('click', randomColors);

function randomColors() {
  let colorDivs = document.getElementsByClassName('color');
  colorPaletteArray = [];
  for (let index = 1; index <= 3; index++) {
    colorDivs[index].style.backgroundColor = randomHex();
    colorPaletteArray.push(colorDivs[index].style.backgroundColor); //Grava num array as novas cores
  }
  // console.log(colorPalette);
  storageColorPalette(colorPaletteArray);
}

function randomHex() {
  return '#' + parseInt(Math.random() * 100) + parseInt(Math.random() * 100) + parseInt(Math.random() * 100);
}

function storageColorPalette(arrayColors) {
  localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
  // console.log(arrayColors);
}

  // let listColors = document.querySelectorAll('.color')
  // let conta = 0;
  // for (let index = 0; index <= 3; index++ ) {
  //     for (const i of listColors) {
  //       if (listColors[index].style.backgroundColor === i.style.backgroundColor){
  //         conta += 1;
  //       }
  // }
  // conta = 0;
  // }