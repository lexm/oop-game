function Player(name) {
  this.name = name;
  this.hp = 100;
  this.int = null;
  this.str = null;
  this.currentRoom = 1;
}

Player.prototype.read(scroll) {
  if(this.int >= 10) {
    console.log('the scroll reads: "' + scroll.text + '"');
  } else {
    console.log('you cannot read the scroll');
  }
}

function Wizard(name) {
  Player.call(this, name);
  this.int = 18;
  this.str = 9;
}

Wizard.prototype = new Player();

function Barbarian(name) {
  Player.call(this, name);
  this.int = 8;
  this.str = 19;
}
