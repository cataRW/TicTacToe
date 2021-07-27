let moveCount = 0;
let allBoxes = [];

window.addEventListener('load', () => {
  var indexId = 1;
  for(let i = 1; i < 4; ++i) {
    allBoxes[i] = [];
    for(let j = 1; j < 4; ++j) {
      allBoxes[i][j] = document.getElementById(indexId);
      allBoxes[i][j].addEventListener('click', () => {
        nextMove(allBoxes[i][j].id);
      });
      ++indexId;
    }
  }
});

function nextMove(id) {
  const thisBox = document.getElementById(id);
  const updateStatus = document.querySelector('.status');
  let message = updateStatus.innerText;

  if(thisBox.innerText === '') {
    if(updateStatus.innerText == 'Player2 turn') {
      thisBox.innerText = '0';
      updateStatus.innerText = 'Player1 turn';
    }else {
      thisBox.innerText = 'X';
      updateStatus.innerText = 'Player2 turn';
    }
    ++moveCount;
    if(moveCount > 4 && (rowsAndColumnsCheck() || diagonalsCheck())) {
      winner(message);
    }else if(moveCount === 9) {
      winner('draw');
    }
  }
}

function rowsAndColumnsCheck() {
  for(let i = 1; i < 4; ++i) {
    if(allBoxes[i][1].innerText == allBoxes[i][2].innerText && allBoxes[i][2].innerText == allBoxes[i][3].innerText && allBoxes[i][2].innerText !== '') {
      return true;
    }else if(allBoxes[1][i].innerText === allBoxes[2][i].innerText && allBoxes[2][i].innerText === allBoxes[3][i].innerText && allBoxes[2][i].innerText !== '') {
      return true;
    }
  }
  return false;
}

function diagonalsCheck() {
  let counterD1 = 1, counterD2 = 1;
  for(let i = 1; i < 3; ++i) {
    if(allBoxes[i][i].innerText === allBoxes[i + 1][i + 1].innerText && allBoxes[i][i].innerText !== '') {
      counterD1++;
    }
    if(allBoxes[i][3 - i + 1].innerText === allBoxes[i + 1][3 - i].innerText && allBoxes[i + 1][3 - i].innerText !== '') {
      counterD2++;
    }
  }
  if(counterD1 === 3 || counterD2 === 3) {
    return true;
  }
  return false;
}

function winner(message) {
  let finalMessage = document.querySelector('.status');
  if(message !== 'draw') {
    finalMessage.innerText = 'Winner: ' + message.substr(0, 7);
    finalMessage.style.backgroundColor = 'green';
  }else {
    finalMessage.innerText = message;
    finalMessage.style.backgroundColor = 'grey';
  }
  setTimeout(function() {
   window.location.reload(1);
  }, 2500);
}
