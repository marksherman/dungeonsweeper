var peer;
var id1 = '6ohdhN5857gg4c';
var id2 = 't7n288J3QWky1i';
var checkbox;
var playerRadio;
var goButton;
var conn;

function setup() {
  noCanvas();
  playerRadio = createRadio();
  playerRadio.option('1');
  playerRadio.option('2');
  playerRadio.selected('1');

  goButton = createButton('Start');
  goButton.mousePressed(start);

  checkbox = createCheckbox();
  checkbox.changed(checkedEvent);

}

function start() {
  console.log("Starting");
  let player = playerRadio.value();
  let peerId;
  if (player === '1'){
    peerId = id1;
    console.log('Player 1');
  } else {
    peerId = id2;
    console.log('Player 2');
  }
  peer = new Peer(peerId);

  peer.on('connection', function(conn) {
    console.log('Connected by ', conn.peer)
    conn.on('open', () => {
      conn.on('data', (data) => console.log('data received:', data));
    });
  });

  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    if (player === '1') {
      conn = peer.connect(id2);
    }
  });

  
}

function checkedEvent() {
  if(this.checked()) {
    console.log('Checking');

  } else {
    console.log('Unchecking');
  }
  if (conn._open === true) {
    conn.send(this.checked());
  }
}

