'use strict';

var prompt = require('prompt');
var classSchema = {
  properties: {
    class: {
      description: '(W)izard or (B)arbarian?',
      pattern: /^[BbWw]$/,
      message: '"B" or "W", please.',
      required: true
    }
  }
}


prompt.start();
prompt.get(classSchema, function(err, result) {
  console.log('class: ' + result.class);
});
