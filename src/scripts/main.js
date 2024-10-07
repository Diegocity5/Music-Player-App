const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

//Lista de canciones
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3"
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3"
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3"
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3"
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3"
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3"
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3"
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3"
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3"
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "3:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3"
    },
];

/*Web Audio Api*/
const audio = new Audio();//creando un nuevo elemento de audio html5
let userData = {
    songs: [...allSongs],//creando una copia de la lista de canciones con el spread operator.
    currentSong: null,
    songCurrentTime: 0,
};//Donde guardaremos la información de la cancion actual que se esta reproduciendo y el tiempo.

const printGreeting = ()=>{
    console.log('Hello there!');
}
printGreeting();

/*Los arrow funtions aceptan parametros como las funciones normales si hay un solo argumento
podemos omitir los parentesis*/
const printMessage = org => {
    console.log(`${org} is awesome!`);
}
printMessage('Freecodecamp');

/*Los arrow functions tambien permiten controlar el retorno como funciona normalmente.*/
const addTwoNumbers = (num1, num2)=> num1 + num2;//Refactorizando usando el retorno implicito dado a que tiene una expresion pequeña.

console.log(addTwoNumbers(3, 4));