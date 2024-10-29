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

//Funcion que renderizar canciones en el DOM.
const renderSongs = (array)=>{
    //El método map() se utiliza para iterar a través de una matriz y devolver una nueva matriz
    const songsHTML = array.map((song)=>{
        return `
        <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        </li>`
    }).join('');//Metodo join() se utiliza para unir los elementos de un array en un solo string recibe como argumento un separador.

    playlistSongs.innerHTML = songsHTML;//Insertando li songs en el contenedor de la playlist.
};

//Funcion que ordenara alfabeticamente por titulo las canciones
const sortSongs = ()=>{
    userData?.songs.sort((a, b)=> {
        //ordena antes antes que b o asia la izquierda
        if(a.title < b.title){
            return -1;
        }
        //ordena despues que b o hacia la derecha
        if(a.title > b.title){
            return 1;
        }
        //mantiene en el mismo lugar de orden porque es igual a b
        return 0;
    });//ordenar el array directamente dado a que es mutable.

    return userData?.songs;
}

//Funcion para reproducir cualquier cancion mostrada en el DOM teniendo en cuenta su id
const playSong = (id)=>{
    //Buscando la cancion que queremos reproducir gracias al metodo find.
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;//Agregando la ruta de la cancion encontrada para reproducir
    audio.title = song.title;//Agregando el titulo de la cancion encontrada para mostrar

    //Esta condición comprobará si no se está reproduciendo ninguna canción actual o si la canción actual es diferente de la que está a punto de reproducirse.
    if(userData?.currentSong === null || userData?.currentSong.id !== song.id){
        audio.currentTime = 0;//Antes de reproducir la canción, debes asegurarte de que comience desde el principio
    }else {
        //Agrega un bloque else para manejar el tiempo de reproducción actual de la canción. Esto le permite reanudar la canción actual en el punto donde se pausó.
        audio.currentTime = userData?.songCurrentTime;
    }
    //Agregando la canción que se está reproduciendo actualmente.
    userData.currentSong = song;
    /*Agregando la clase playing al playButton para que tome los estilos CSS para la experiencia
    del usuario cuando se este reproduciendo.*/
    playButton.classList.add('playing');
    //Reproducir la cancion finalmente
    audio.play();
}
//Funcion que se encargara de pausar la cancion actual
const pauseSong = ()=>{
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove('playing');
    audio.pause();
}

//Funcion para obtener el indice de un elemento del array si no lo encuentra da -1
const getCurrentSongIndex = ()=>{
    return userData?.songs.indexOf(userData.currentSong);
}

//Funcion para reproducir la siguiente cancion
const playNextSong = ()=>{
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id);
    }else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex + 1];//accediendo a la cancion consecutiva
        playSong(nextSong.id);
    }
}

//Funcion para reproducir la anterior cancion
const playPreviousSong = ()=>{
    if(userData?.currentSong === null){
        return;
    }else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id);
    }
}

//Funcion para resaltar visualmente la cancion que se esta reproduciendo en el DOM
const highlightCurrentSong = ()=>{
    const playlistSongElements = document.querySelectorAll('.playlist-song');
}

playButton.addEventListener('click', ()=>{
    //Si le dieron en reproducir y no se ha seleccionado una cancion actual.
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id);//Inicie reproduciendo la primera cancion de la lista
    }else {//Esto garantiza que la canción que se reproduce actualmente continuará reproduciéndose cuando se haga clic en el botón de reproducción.
        playSong(userData?.currentSong.id);
    }
});
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPreviousSong);
/*El optional chaining (?.) es una característica de JavaScript
que permite acceder a propiedades de objetos anidados de manera segura.
Si una propiedad no existe en algún nivel de la cadena, en lugar de lanzar un error,
devuelve undefined.
Esto es útil para evitar errores al acceder a propiedades que pueden no estar definidas,
haciendo que el código sea más limpio y fácil de mantener*/
renderSongs(sortSongs());