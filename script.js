  let colorPalette = document.getElementById('color-palette');
  for (let index = 1; index <= 4; index++) {
    let colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    if (index == 1) {
      colorDiv.style.backgroundColor = 'rgb(00, 00, 00)';
    }else{
      while (colorDiv.style.backgroundColor == '') {
        colorDiv.style.backgroundColor = 
        '#' + parseInt(Math.random() * 100) + parseInt(Math.random() * 100) + parseInt(Math.random() * 100);
      }
    }
    colorPalette.appendChild(colorDiv);
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