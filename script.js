let colorPalette = document.getElementById('color-palette');
for (let index = 1; index <= 4; index++) {
  let colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  if (index == 1) {
    colorDiv.style.backgroundColor = 'rgb(00, 00, 00)';
  } else {
    while (colorDiv.style.backgroundColor == '') {
      colorDiv.style.backgroundColor = randomHex();
    }
  }
  colorPalette.appendChild(colorDiv);
}

let btnRandom = document.createElement('button');
btnRandom.id = 'button-random-color';
btnRandom.innerText = 'Cores aleatórias'
colorPalette.appendChild(btnRandom);
btnRandom.addEventListener('click', randomColors);

function randomColors() {
  let colorDivs = document.getElementsByClassName('color');
  // console.log(colorDivs);
  for (let index = 1; index <= 3; index++) {
    colorDivs[index].style.backgroundColor = randomHex();
  }
}

function randomHex() {
  return '#' + parseInt(Math.random() * 100) + parseInt(Math.random() * 100) + parseInt(Math.random() * 100);
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