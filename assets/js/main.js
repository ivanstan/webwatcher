var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('popper.js');
require('bootstrap');

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();

  $('.monaco-editor').each(function(index, element) {
        let $element = $(element);
        monaco.editor.create(element, {
          value: $element.data('code'),
          language: $element.data('language')
        });
  });
});
