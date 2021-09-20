// converting duration 
const convertDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
let runLoop;
// is playSong is runing ? 
plrun = false;

function playSong(id) {
  // make all song background white 
  for (song of player.songs){
    document.getElementById(song.id).style.backgroundColor = "white";
  }

  if(plrun){
    document.getElementById(id.path[1].id).style.backgroundColor = "white";
    clearTimeout(runLoop);
    plrun = false;
    } 
  if (id === player.songs.length) {
    id.path[1].id = 1;
  }
  if(plrun === false){
    let changeButton = document.getElementsByClassName("play");
   console.log(changeButton);
      changeButton.innerHTML = "⏸";
    
    document.getElementById(id.path[1].id).style.backgroundColor = "#af934c";
    
    plrun = true;
    // after 3 sec or duration of song turn off song 
  runLoop = setTimeout(() => {
    plrun = false;
    document.getElementById(id.path[1].id).style.backgroundColor = "white";
    playsongnextSong(Math.abs(id.path[1].id )+ 1);
    
  }, 3000); //duration of song here
  changeButton.innerHTML = "▶"; 
  }
}
    

const playsongnextSong = (id) =>{
  
  if(plrun){
    document.getElementById(id).style.backgroundColor = "white";
    clearTimeout(runLoop);
    plrun = false;
    } 
  if (id === player.songs.length+1) {
    id = 1;
  }
  if(plrun === false){
    let changeButton = document.getElementsByClassName("play");
    
    document.getElementById(id).style.backgroundColor = "#af934c";
    plrun = true;
    // after 3 sec or duration of song turn off song 
  runLoop = setTimeout(() => {
    changeButton[0].innerHTML = "⏸";
    plrun = false;
    document.getElementById(id).style.backgroundColor = "white";
    playsongnextSong( id + 1);
    
  }, 3000); //duration of song here
  changeButton[0].innerHTML = "▶"; 
  }

}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
  console.log(songId.path[1]);
  const song = player.songs[songId.path[1].id]
  let numberOfElementToRemove = 1;
  player.songs.splice(songId.path[1].id  , numberOfElementToRemove);
  document.getElementById(songId.path[1].id).remove();
  console.log(player.songs);
}
/**
 * Adds a song to the player, and updates the DOM to match.
 */
document.getElementById("add-button").addEventListener("click", function () {
  let ele = {};
  let id = player.songs.length + 1;
  ele.id = id;
  let title = document.querySelectorAll('input[name = title]')[0].value;
  ele.title = title;
  let album = document.querySelectorAll('input[name = album]')[0].value;
  ele.album = album;
  let artist = document.querySelectorAll('input[name = artist]')[0].value;
  ele.artist = artist;
  let duration = document.querySelectorAll('input[name = duration]')[0].value;
  ele.duration = duration;
  duration = document.querySelectorAll('input[name = duration]')[0].value;
  let coverArt = document.querySelectorAll('input[name = cover-art]')[0].value;
  ele.coverArt = coverArt;
  addSong({
    id,
    title,
    album,
    artist,
    duration,
    coverArt
  });
  // make the input ready for new song 
  document.querySelectorAll('input[name = artist]')[0].value = '';
  document.querySelectorAll('input[name = duration]')[0].value = '';
  document.querySelectorAll('input[name = cover-art]')[0].value = '';
  document.querySelectorAll('input[name = album]')[0].value = '';
  document.querySelectorAll('input[name = title]')[0].value = '';
});

function addSong({
  id,
  title,
  album,
  artist,
  duration,
  coverArt
}) {
  let allSongs = player.songs;
  allSongs.push({
    id,
    title,
    album,
    artist,
    duration,
    coverArt
  });
  printaSong(id, title, album, artist, duration, coverArt);
}
/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {

}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
  // Your code here
}
//  gives platlist duration 
function playlistDuration(id) {
  const foundPlaylist = player.playlists.find(currPlaylist => currPlaylist.id === id);

  // Reduce function to sum all the song durations, by finding each of them, and then adding to the sum
  return foundPlaylist.songs.reduce((sum, currSong) =>
    sum + player.songs.find(song => song.id === currSong).duration, 0);
}

function createSongElement({
  id,
  title,
  artist,
  duration,
  coverArt
}) {
  const colored = (duration) => {
    return duration < 600 ? 'color:green' : 'color:red';
  }
  // const classes = [];
  const getId = createElement('p', [id]);
  const titleSong = createElement('span',[title]);
  const artistEl = createElement("p", [artist]);
  let newDuration = convertDuration(duration)
  const durationEl = createElement("p", [newDuration], ["duration", "short-duration"], {
    style: colored(duration)
  }, {});
  const coverImageArtUrl = coverArt;
  const imgEl = createElement("img", [], ["album-art"], {
    src: coverImageArtUrl
  });
  const attrs = {
    // onclick: `playSong(${id})`,
    id,
    class: `songs`
  };

  const playButton = createElement('button', ["▶"],['play']);
  playButton.addEventListener("click", playSong);
  const removeButton = createElement('button', ["❌"], ['remove']);
  removeButton.addEventListener("click", removeSong);
  // classes.push("songs");
  return createElement("div", [getId,'Title: ',titleSong, "Artist: ", artistEl, "Duration: ", durationEl, imgEl,removeButton,  playButton], [], attrs, []);
}


function createPlaylistElement({
  id,
  name,
  songs = []
}) {
  const children = [];
  const classes = [];
  const attrs = {};
  const idEl = createElement("span", ["" + id], ["id"]);
  const playListName = createElement("p", [name]);
  const PLsongs = createElement("p", [songs]);
  const durationEl = createElement("p", ["" + convertDuration(playlistDuration(id))], ["duration", "short-duration"]);
  classes.push("playlist")
  children.push(idEl, "Play list Name: ", playListName, 'songs: ', PLsongs, " time: ", durationEl);

  return createElement("div", children, classes, attrs, );


}

function createElement(tagName, children = [], classes = [], attributes = {}, ) {
  const el = document.createElement(tagName);

  // Children
  for (const child of children) {
    el.append(child);
  }

  // Classes
  for (const cls of classes) {
    el.classList.add(cls);
  }

  // Attributes
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }

  return el;
}
// sorting songs
const sortBySong = () => {
  player.songs.sort((a, b) => (a.title > b.title) * 2 - 1);
}
// sorting platlists 
const sortByPlayList = () => {
  player.playlists.sort((a, b) => (a.title > b.title) * 2 - 1);
}
// printing all songs 
const printAllSongs = (id) => {
  const songPrint = document.getElementById("songs");

  for (let song of player.songs) {
    const {
      title,
      album,
      artist,
      duration = duration,
      id,
      coverArt
    } = song;
    const songElemnt = createSongElement({
      id,
      title,
      album,
      artist,
      duration,
      coverArt
    });
    songPrint.appendChild(songElemnt);
  }

}

// printing all plalysts 
const printAllPlaylists = () => {
  const playlistPrint = document.getElementById("playlists");

  for (let playlist of player.playlists) {
    const {
      id,
      name,
      songs
    } = playlist;
    const playlistElem = createPlaylistElement({
      id,
      name,
      songs
    });
    playlistPrint.append(playlistElem);
  }
}

const printaSong = (id, title, album, artist, duration, coverArt) => {
  const songPrint = document.getElementById("songs");
  let song = '';
  const songElemnt = createSongElement({
    id,
    title,
    album,
    artist,
    duration,
    coverArt
  });
  console.log(song)
  songPrint.appendChild(songElemnt)
}
// calling functions 
sortBySong();
printAllSongs();
printAllPlaylists();
document.getElementById("add-button").addEventListener("click", handleAddSongEvent);