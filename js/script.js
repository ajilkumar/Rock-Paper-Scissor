const choices = ['rock', 'paper', 'scissors'];
const botImage = document.querySelector('.bot-choice img');
const choiceImages = document.querySelectorAll('.your-choice .choice-image');
let playerScore = 0
let botScore = 0

function setBotImage(botChoice) {
  switch (botChoice) {
    case 'rock':
      botImage.src = '../images/rock.png';
      break;
    case 'paper':
      botImage.src = '../images/paper.png';
      break;
    case 'scissors':
      botImage.src = '../images/scissors.png';
      break;
    default:
      botImage.computedStyleMap.display = 'none';
      break;
  }
}

function getRandomChoice() {
  const botChoiceIndex = Math.floor(Math.random() * choices.length);
  return choices[botChoiceIndex];
}

function handleImageClick(event) {
  const clickedImageSrc = event.target.src;

  const botChoice = getRandomChoice();
  setBotImage(botChoice);

  const botChoiceImage = document.querySelector('.bot-choice img');
  botChoiceImage.style.display = 'inline-block';

  document.querySelector('.player-choice img').setAttribute('src', clickedImageSrc);

  const playerChoice = event.target.alt;
  const result = determineWinner(playerChoice, botChoice);
  
  document.querySelector('.choose').textContent = result;
  //console.log(botChoiceImage);
  //console.log(clickedImageSrc);

  const playersDiv = document.querySelector('.players');
  switch(result) {
    case 'You win!':
      playerScore++;
      break;
    case 'Bot wins!':
      botScore++;
      break;
  }

  playersDiv.innerHTML = `
    <p class="bot">Bot: <span class="bot">${botScore}</span></p>
    <p class="you">You: <span class="you">${playerScore}</span></p>
  `;

  const container = document.querySelector('.container');
  switch(result) {
    case 'You win!':
      container.style.background = 'linear-gradient(135deg, rgba(210,255,82,1) 0%, rgba(145,232,66,1) 100%)';
      break;
    case 'Bot wins!':
      container.style.background = ' linear-gradient(135deg, rgba(248,80,50,1) 0%, rgba(241,111,92,1) 50%, rgba(231,56,39,1) 100%)';
      break;
    case "It's a tie!":
      container.style.background = 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(255,203,48,1) 100%';
      break;
    default:
      container.style.background = 'linear-gradient(to right, #FFFFFF, #808080)';
      break;
  }
}

function determineWinner(playerChoice, botChoice) {
  if (
    (playerChoice === 'rock' && botChoice === 'scissors') ||
    (playerChoice === 'paper' && botChoice === 'rock') ||
    (playerChoice === 'scissors' && botChoice === 'paper')
  ) {
    document.get
    return 'You win!';
  } else if (
    (botChoice === 'rock' && playerChoice === 'scissors') ||
    (botChoice === 'paper' && playerChoice === 'rock') ||
    (botChoice === 'scissors' && playerChoice === 'paper')
  ) {
    return 'Bot wins!';
  } else {
    return "It's a tie!";
  }
}

choiceImages.forEach(image => {
  image.addEventListener('click', handleImageClick);
});

// Initial bot choice
const botChoice = getRandomChoice();
setBotImage(botChoice);

const restartButton = document.querySelector('.restart button');

function resetGame() {
  // Reset scores
  playerScore = 0;
  botScore = 0;

  // Hide bot's choice image
  botImage.style.display = 'none';

  // Reset container background color
  const container = document.querySelector('.container');
  container.style.background = 'linear-gradient(to bottom, rgba(181,225,238,1) 0%, rgba(67,208,230,1) 49%, rgba(190,229,239,1) 100%';

  // Reset HTML for scores
  const playersDiv = document.querySelector('.players');
  playersDiv.innerHTML = `
    <p class="bot">Bot: <span class="bot">${botScore}</span></p>
    <p class="you">You: <span class="you">${playerScore}</span></p>
  `;

  // Reset result message
  document.querySelector('.choose').textContent = 'Choose';

  // Reset player choice image
  document.querySelector('.player-choice img').setAttribute('src', '');

  // Initial bot choice
  const botChoice = getRandomChoice();
  setBotImage(botChoice);
}

restartButton.addEventListener('click', resetGame);

