const base = require('./baseObj');
var Room = base.Room;
var Key = base.Key;
var Door = base.Door;
var Scroll = base.Scroll;

var startRoom = new Room(1);
var nextRoom = new Room(2);
var westRoom = new Room(3);
var eastRoom = new Room(4);

var key1 = new Key(1, 1234);
var door1 = new Door(true, false, 0);
var door2 = new Door(false, false, 0);
var door3 = new Door(false, true, 1234);

startRoom.south = {
  door: door1,
  leadsTo: nextRoom
}

nextRoom.north = {
  door: door1,
  leadsTo: startRoom
}

nextRoom.east = {
  door: door2,
  leadsTo: eastRoom
}

eastRoom.west = {
  door: door2,
  leadsTo: nextRoom
}

nextRoom.west = {
  door: door3,
  leadsTo: westRoom
}

westRoom.east = {
  door: door3,
  leadsTo: nextRoom
}

function win() {
  console.log('Congratulations');
}

function lose() {
  console.log('Better luck next time');
}

startRoom.itemList.push(new Scroll('red', 'not the west room!', null));
eastRoom.itemList.push(new Scroll('blue', 'you won the game!', win()));
westRoom.itemList.push(new Scroll('green', 'nooo! you lose!!!', lose()));
