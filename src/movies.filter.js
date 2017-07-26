/* globals $ */

const filterMovies = () => {
  const genreOptions = [].slice.call($('.genre-option'));
  const output = [];
  genreOptions.forEach((genre) => {
    if (genre.checked) {
      output.push(genre.value);
    }
  });
  const url = 'http://localhost:8000/movies/view?page=1&size=10&genres=' + output.join(',');

  document.location = url;
};

$('.genre-label').on('click', (e) => {
  const $this = $(e.target);
  $this.toggleClass('clicked');
});
