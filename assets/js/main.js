var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a letiable, just require it
require('popper.js');
require('bootstrap');
var Chart = require('chart.js');

// var canvas = require('canvas-prebuilt');
// requirex('resemblejs');

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

    $('.response-time-chart').each((index, element) => {
        let $element = $(element);

        let ctx = document.getElementById($element.attr('id')).getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Page response time',
                    backgroundColor: 'transparent',
                    borderColor: '',
                    data: [
                        1, 2, 3, 4
                    ],
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Performance data'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Seconds'
                        }
                    }]
                }
            }
        });

    });

    $('.monaco-editor').each((index, element) => {
        let $element = $(element);
        monaco.editor.create(element, {
            value: $element.data('code'),
            language: $element.data('language'),
            automaticLayout: true,
            readOnly: true,
        });
    });

    $('.monaco-compare').each((index, element) => {
        let $element = $(element);

        let snapshot1 = monaco.editor.createModel($element.data('snapshot1'), "html");
        let snapshot2 = monaco.editor.createModel($element.data('snapshot2'), "html");

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

    $('.compare-page-snapshots-selector').each((index, element) => {
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

    $('.compare-project-snapshots-selector').each((index, element) => {
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

    $('#container').resize(function () {
        editor.layout();
    });

    $('.hash-component button').on('click', (element) => {
        let input = $(element).closest('input');
        input.focus();
        input.select();
        document.execCommand('Copy', false, null);
    });
});
