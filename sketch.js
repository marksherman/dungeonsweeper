/* globals partyConnect partyLoadShared partySetShared  partyIsHost */

let checkbox;
let shared;

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "dungeonsweeper_9fRcb64hhCySEeRx",
    "main"
  );
  shared = partyLoadShared('state', {checked: true});
}

function setup() {
  noCanvas();

  checkbox = createCheckbox();
  checkbox.changed(checkedEvent);
  checkbox.checked(shared.checked);

  if(partyIsHost()) {
    console.log("Hosting")
    partySetShared(shared, {checked: true, init: true});
  }
}

function checkedEvent() {
  console.log(`Local change, now ${checkbox.checked()}`);
  shared.checked = checkbox.checked();
}

function draw() {
  // console.log(`${millis()} ${checkbox.value()}`);
  if(shared.checked != checkbox.checked()) {
    checkbox.checked(shared.checked);
  }
}

