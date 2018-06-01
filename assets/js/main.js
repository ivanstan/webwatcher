var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a letiable, just require it
require('popper.js');
require('bootstrap');
require('react-dom');

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();

  $('.monaco-editor').each((index, element) => {
        let $element = $(element);
        monaco.editor.create(element, {
          value: $element.data('code'),
          language: $element.data('language')
        });
  });

  $('.monaco-compare').each((index, element) => {
    let $element = $(element);

    let snapshot1 = monaco.editor.createModel($element.data('snapshot1'), "text/html");
    let snapshot2 = monaco.editor.createModel($element.data('snapshot2'), "text/html");

    let diffEditor = monaco.editor.createDiffEditor(element);
    diffEditor.setModel({
      original: snapshot1,
      modified: snapshot2
    });

    monaco.editor.createDiffNavigator(diffEditor, {
      followsCaret: true,
      ignoreCharChanges: true
    });
  });

  $('.compare-selector').each((index, element) => {
    let $element = $(element);
    let path = $element.data('path');

    $element.find('button').on('click', () => {
      let snapshot1 = $element.find('[name="snapshot1"]').val();
      let snapshot2 = $element.find('[name="snapshot2"]').val();
        path = path.replace('snapshot1', snapshot1);
        path = path.replace('snapshot2', snapshot2);

        window.location.assign(path);
    });
  });
});
