(function () {
  'use strict';

  const movies = [];

  const renderMovies = function () {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-Content center');
      const $title = $('<h6>').addClass('card-Title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('Poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  var input = document.querySelector('#search');
  var search = document.querySelector('#submit');
  const proxy = 'https://cors-anywhere.herokuapp.com/'

  search.addEventListener('click', submitInput)

  function submitInput(event) {
    event.preventDefault()
    fetch(proxy + 'http://omdb-api.now.sh/?s=' + encodeURI(input.value))
      .then(function (response) {
        return response.json()
        // console.log(response.json)
      })
      .then(function (data) {
        movies.push(data.Search[0])
        console.log(movies)
        renderMovies();
      })
      .catch(function (error) {
        console.log(error)
      })
    // console.log(movies)
    // renderMovies();

  }



  // ADD YOUR CODE HERE
})();
