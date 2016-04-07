function Item(weight) {
  this.weight = weight;
  this.blessed = 0;
}

Item.prototype.bless = function() {
  if(this.blessed < 1) {
    this.blessed = this.blessed + 1;
  }
}

Item.prototype.curse = function() {
  if(this.blessed > -1) {
    this.blessed = this.blessed - 1;
  }
}

function Scroll(name, text, effect) {
  Item.call(this, 1);
  this.name = name;
  if(text) {
    this.text = text;
  } else {
    this.text = '';
  }
  if(effect) {
    this.effect = effect;
  } else {
    this.effect = null;
  }
}

Scroll.prototype = new Item(0);

function Key(id, code) {
  Item.call(this, 2);
  this.id = id;
  this.code = code;
}

Key.prototype = new Item(0);

function Room(number) {
  this.number = number;
  this.north = null;
  this.east = null;
  this.west = null;
  this.south = null;
  this.itemList = [];
}

function Door() {
  this.open = true;
  this.locked = false;
  this.code = 0;
  this.sides = [null, null];
}

Door.prototype.unlock = function(key) {
  if(this.locked) {
    if(this.code === 0 || this.code === key.code) {
      this.locked = false;
      return 'door is now unlocked';
    } else {
      return 'the key doesn\'t fit this door';
    }
  } else {
    return 'door is already unlocked';
  }
}

Door.prototype.lock = function(key) {
  if(this.open) {
    return 'this door cannot be locked while open';
  }
  if(this.locked) {
    return 'door is already locked';
  } else {
    if(this.code === 0 ) {
      return 'lock is broken';
    } else if (this.code === key.code) {
      this.locked = true;
      return 'door is now locked';
    } else {
      return 'the key doesn\'t fit this door';
    }
  }
}

Door.prototype.open = function() {
  if(this.open) {
    return 'door is already open'
  } else if (this.locked) {
    return 'door is locked';
  } else {
    this.open = true;
    return 'door is now open';
  }
}

Door.prototype.close = function() {
  if(!this.open) {
    return 'door is already closed';
  } else {
    this.open = false;
    return 'door is now closed';
  }
}
