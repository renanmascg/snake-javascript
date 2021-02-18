import { equalPositions } from './auxiliar.js';
 
export const SNAKE_SPEED = 5;

let newSegments = 0;

let snakeBody = [
  {x: 11, y: 11},
]

export function update(inputDirection) {

  if(inputDirection.x === 0 && inputDirection.y === 0) {
    return;
  }
  const newHead = {
    x: getSnakeHead().x + inputDirection.x,
    y: getSnakeHead().y + inputDirection.y
  }
  
  const newSnakeBody = newSegments === 0 ? snakeBody.slice(0, snakeBody.length - 1) : [...snakeBody]
  snakeBody = [newHead].concat(newSnakeBody)
  newSegments = 0
};

export function draw(gameboard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');

    // configurar css
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    
    // adicionar classe no elemento
    snakeElement.classList.add('snake')

    // realmente printar isso no DOM
    gameboard.appendChild(snakeElement)
  })
};

export function collision(position) {
  return snakeBody.some(segment => {
    return equalPositions(position, segment);
  })
}

// functions to expand snake
export function expandSnake(amount) {
  newSegments += amount;
}

// external functions
export function getSnakeHead() {
  return snakeBody[0];
}

export function selfCollision() {
  const snakeHead = snakeBody[0];

  return snakeBody.some((segment, index) => {
    if (index === 0) return false;

    return equalPositions(snakeHead, segment);
  })
}