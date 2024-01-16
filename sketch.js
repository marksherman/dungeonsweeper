/* globals partyConnect partyLoadShared partySetShared  partyIsHost */

let checkbox;
let shared;

let viewPort = {w: 640, h: 480}
let gridSize = 20;

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "dungeonsweeper_9fRcb64hhCySEeRx",
    "main"
  );
  shared = partyLoadShared('state', {checked: true});
}

let sqSprite;

function setup() {
  new Canvas(viewPort.w, viewPort.h);
  sqSprite = new Sprite(0,0,gridSize, gridSize);

}

function checkedEvent() {
  console.log(`Local change, now ${checkbox.checked()}`);
  shared.checked = checkbox.checked();
}

function drawMap() {
  background(150);
  camera.on();
  for (let i = 0; i < 10; i++) {
		fill(i * 20, 200, 200); // blue to gray
		rect(-250 + i * 50, -250 + i * 100, 750, 50);
	}
  drawMapGrid();

	if (mouse.pressing()) camera.zoom = 1.5;
	else camera.zoom = 1;

  camera.off();
  // print(`cam x: ${camera.pos.x} y: ${camera.pos.y} mouse x: ${camera.mouse.x}/${mouseX} y: ${camera.mouse.y}/${mouseY}`);
}

function drawMapGrid() {
  for(let x = 0; x <= width; x += gridSize) {
    line(x, 0, x, height);
  }
  for(let y = 0; y <= height; y += gridSize) {
    line(0, y, width, y);
  }
}

function draw() {
  drawMap();
}

