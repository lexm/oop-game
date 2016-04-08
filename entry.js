'use strict';

require('./lib/baseObj');
var hero = require('./lib/hero');
var Barbarian = hero.Barbarian;
var Wizard = hero.Wizard;
var board = require('./lib/board');

var prompt = require('prompt');
var playerSchema = {
  properties: {
    name: {
      description: 'Please enter your character name',
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Letters and numbers only, please',
      required: true
    },
    class: {
      description: '(W)izard or (B)arbarian?',
      pattern: /^[BbWw]$/,
      message: '"B" or "W", please.',
      required: true
    }
  }
};

var player;
var currentRoom = board.startRoom;

prompt.start();
prompt.get(playerSchema, function(err, result) {
  console.log('name:  ' + result.name);
  console.log('class: ' + result.class);
  if(err) {
    console.error(err);
  } else if (result.class === 'b' || result.class === 'B') {
    player = new Barbarian(result.name);
  } else if (result.class === 'w' || result.class === 'W') {
    player = new Wizard(result.name);
  } else {
    console.log('bad input', result);
  }
});

currentRoom.look();
