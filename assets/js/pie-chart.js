$(document).ready(function () {

  var getRandomColor = function (index) {
    let colors = [
      '#3366cc',
      '#dc3912',
      '#ff9900',
      '#109618',
      '#990099',
      '#0099c6',
      '#dd4477',
      '#66aa00',
      '#b82e2e',
      '#316395',
      '#3366cc',
      '#994499',
      '#22aa99',
      '#aaaa11',
      '#6633cc',
      '#e67300',
      '#8b0707',
      '#651067',
      '#329262',
      '#5574a6',
      '#3b3eac',
      '#b77322',
      '#16d620',
      '#b91383',
      '#f4359e',
      '#9c5935',
      '#a9c413',
      '#2a778d',
      '#668d1c',
      '#bea413',
      '#0c5922',
      '#743411',
    ];

    let offset = parseInt(index % colors.length);

    return colors[offset];
  };

  $('.pie-chart').each((index, element) => {
    let $element = $(element);
    let json = $element.data('chart');
    let title = $element.data('title');

    let labels = [];
    let data = [];
    let colors = [];
    let count = 0;
    for (let label in json) {
      let freq = json[label];
      labels.push(label);
      data.push(freq);
      colors.push(getRandomColor(count));
      count++;
    }

    var config = {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: colors,
          label: title
        }],
        labels: labels
      },
      options: {
        responsive: true
      }
    };

    let ctx = document.getElementById($element.attr('id')).getContext('2d');
    let chart = new Chart(ctx, config);
  });

});
