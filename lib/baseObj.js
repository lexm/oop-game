var prompt = require('prompt');

function Item(weight) {
  this.weight = weight;
  this.blessed = 0;
}

Item.prototype.bless = function() {
  if(this.blessed < 1) {
    this.blessed = this.blessed + 1;
  }
};

Item.prototype.curse = function() {
  if(this.blessed > -1) {
    this.blessed = this.blessed - 1;
  }
};

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


Room.prototype.look = function() {
  var roomDesc;
  var exits = [];
  if(this.north) {
    exits.push('north');
  }
  if(this.east) {
    exits.push('east');
  }
  if(this.west) {
    exits.push('west');
  }
  if(this.south) {
    exits.push('south');
  }
  roomDesc = 'available exits are:';
  exits.forEach(function(cur) {
    roomDesc += '\n' + cur;
  });
  this.itemList.forEach(function(cur) {
    if(cur instanceof Scroll) {
      roomDesc += '\nthere is a ' + cur.name + ' scroll here';
    } else if (cur instanceof Key) {
      roomDesc += '\nthere is a key here';
    }

  });

};

Room.prototype.action = function(promptText, player, currentRoom) {
  var actionSchema = {
    properties: {
      action: {
        description: promptText,
        pattern: /^[cCeEgGlLnNoOsSwW]$/,
        message: 'Valid options are:'
               + '(N)orth, (South), (E)ast, (W)est\n'
               + '(L)ook, (G)et, (O)pen, (C)lose',
        required: true
      }
    }
  };
  prompt.get(actionSchema, function(err, result) {
    if(err) {
      console.error(err);
    } else if (result.action === 'n' || result.action === 'N') {
      if(this.north) {
        currentRoom = this.north;
        return;
      } else {
        console.log('there is no door there');
      }
    } else if (result.action === 's' || result.action === 'S') {
      if(this.south) {
        currentRoom = this.south;
        return;
      } else {
        console.log('there is no door there');
      }
    } else if (result.action === 'e' || result.action === 'E') {
      if(this.east) {
        currentRoom = this.east;
        return;
      } else {
        console.log('there is no door there');
      }
    } else if (result.action === 'w'|| result.action === 'W') {
      if(this.west) {
        currentRoom = this.west;
        return;
      } else {
        console.log('there is no door there');
      }
    } else if (result.action === 'l' || result.action === 'L') {
      currentRoom.look();
    } else if (result.action === 'g' || result.action === 'G') {
      if(!this.itemList.length) {
        console.log('nothing to (g)et here!');
      } else {
        var getPrompt = 'items in this room:\n'
        this.itemList.forEach(function(cur, idx) {
          getPrompt += (idx + 1) + ': ' + cur + '\n';
        });
        // this is where I left off, so it's a bookmark of where to continue...
        // getPrompt += 'please enter the number of the item to (g)et, or "0" to exit';
        // var getSchema = {
        //   itemNum: {
        //
        //   }
        // }
      }

    } else if (result.action === 'o' || result.action === 'O') {

    } else if (result.action === 'c' || result.action === 'C') {

    }
  });

};

function Door(open, locked, code) {
  this.open = open;
  if(this.open && locked) {
    this.locked = false;
    console.log('door cannot be both open and locked');
  } else {
    this.locked = locked;
  }
  if(!code) {
    this.code = 0;
  } else {
    this.code = code;
  }
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
};

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
};

Door.prototype.open = function() {
  if(this.open) {
    return 'door is already open';
  } else if (this.locked) {
    return 'door is locked';
  } else {
    this.open = true;
    return 'door is now open';
  }
};

Door.prototype.close = function() {
  if(!this.open) {
    return 'door is already closed';
  } else {
    this.open = false;
    return 'door is now closed';
  }
};

Door.prototype.bash = function(player) {
  if(player.str > 15) {
    this.open = true;
    this.locked = false;
    this.code = 0;
    return 'you bashed down the door';
  } else {
    player.hp = player.hp - 50;
    return 'Ouch';
  }
};

exports.Door = Door;
exports.Room = Room;
exports.Scroll = Scroll;
exports.Key = Key;
