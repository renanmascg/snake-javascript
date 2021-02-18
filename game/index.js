import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, selfCollision as snakeSelfCollision } from './snake/index.js'
import { getInputDirection } from  './snake/input.js';
import { draw as drawFood, update as updateFood } from './food/index.js'
import { gameboard, isOutsideBoard } from './board/index.js';

let lastTimeRender = 0;

function main(currentTime) {
  if (checkGameOver()) {
    if(confirm('Você Perdeu o Jogo')) {
      window.location.reload();
    } else {
      window.requestAnimationFrame(main);
    }

    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastTimeRender = currentTime;

  update();

  draw();
}

function update() {
  updateSnake(getInputDirection());
  updateFood();
  checkGameOver();
}

function draw() {
  gameboard.innerHTML = '';
  drawFood(gameboard);
  drawSnake(gameboard);
}

function checkGameOver() {
  return isOutsideBoard(getSnakeHead()) || snakeSelfCollision();
}

window.requestAnimationFrame(main)