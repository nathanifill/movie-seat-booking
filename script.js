/* VARIABLES */

const movieSelect = document.getElementById('movie-select');
const screen = document.getElementById('screen');
const movieImgs = {
  'gone-with-the-wind': 'https://media.giphy.com/media/XLwrTpDlEGPe0/giphy.gif',
  avatar: 'https://media.giphy.com/media/AxhxIcTMEMqR2/giphy.gif',
  titanic: 'https://media.giphy.com/media/uTp9UJtBzWe5i/giphy.gif',
  'star-wars': 'https://media.giphy.com/media/vzX4OAfFKhpzG/giphy.gif',
  endgame: 'https://media.giphy.com/media/Z9QGyT1RQL00318Lzz/giphy.gif',
  'the-sound-of-music': 'https://media.giphy.com/media/oqyKi6VA1du8M/giphy.gif',
  et: 'https://media.giphy.com/media/14jRWmyHsokyOY/giphy.gif',
  'the-ten-commandments':
    'https://media.giphy.com/media/2mzOkV1gI3ynLGWgKZ/giphy.gif',
  'doctor-zhivago': undefined,
  'the-force-awakens': 'https://media.giphy.com/media/1ApqN5QrLUePu/giphy.gif',
};
const selectedMovieId = movieSelect[movieSelect.selectedIndex].id;
const allSeats = document.querySelector('#seating');
const seatCount = document.getElementById('seat-count');
const total = document.getElementById('movie-total');
const seatsElements = document.querySelectorAll('.row .seat');

/* FUNCTIONS */

// Update the number of seats selected and total price
function updateCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // updated the seat count on the page
  const numberOfSeats = selectedSeats.length;
  seatCount.innerText = numberOfSeats;
  const moviePrice = +movieSelect.value; // turn string to number
  // sets the text on the page to the correct total
  total.innerText = numberOfSeats * moviePrice;

  const seatArr = [];
  seatsElements.forEach((seat) => {
    // pushes 'true' if seat has 'selected' class
    seat.classList.contains('selected')
      ? seatArr.push(true)
      : seatArr.push(false);
  });

  localStorage.setItem('selectedSeats', seatArr);
}

// Load selected seats from localStorage
function loadSelectedSeats() {
  const selectedSeatsStr = localStorage.getItem('selectedSeats');
  const loadedSelectedSeatsArr = selectedSeatsStr.split(',');

  // toggles selected class on for all seats with 'true' in localStorage node list
  loadedSelectedSeatsArr.forEach((state, index) => {
    state == 'true' ? seatsElements[index].classList.toggle('selected') : false;
  });
}

/* EVENT LISTENERS */

// Listen for clicks on seats and toggles selected class
allSeats.addEventListener('click', (e) => {
  // console.log(e.target.classList);
  e.target.classList.toggle('selected');
  // console.log(e.target.classList);
  updateCount();
});

// listens for changes to the movie select box
movieSelect.addEventListener('change', (e) => {
  const movieId = e.target[e.target.selectedIndex].id;
  const movieName = movieImgs[movieId];
  // console.log(movieName);

  // checks if a string is a url
  function isUrl(str) {
    // Regex from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    const re = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return re.test(str);
  }

  // If movie name is defined,
  if (!!movieName) {
    screen.style.backgroundImage = 'url(' + movieImgs[movieId] + ')';
  } else {
    // Shows default background if image can't be found
    screen.style.backgroundImage =
      "url('https://media.giphy.com/media/YXyxtg0oyzDP2/giphy.gif')";
  }

  // updates the count and total on the page
  updateCount();
});

/* RUN ON PAGE LOAD */

// loads the selected seats from localstorage
loadSelectedSeats();

// get the image for the selected movie on load
screen.style.backgroundImage = 'url(' + movieImgs[selectedMovieId] + ')';
