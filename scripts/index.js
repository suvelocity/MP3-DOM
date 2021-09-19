/**
 * 
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
  let notChosens = document.getElementsByClassName('songShell');
  for(let notChosen of notChosens){
      notChosen.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
  document.getElementById(songId).style.backgroundColor ="hsla(50, 33%, 25%, .75)";
  console.log(songId);
  if (songId < 7) {
    setTimeout(function() { playSong(Number(songId) + 1); }, getSongObjectById(songId).duration * 1000);
}
}

/**
* Creates a song DOM element based on a song object.
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
      let SongTitle = createElement('h2',[title],['songTitles']);
      let songAlbum = createElement('h3',["Album: " + album]);
      let songArtist = createElement('h4',["Artist: " + artist]);
      let songDuration = createElement('h4',[secondsToMinutesConvertor(duration)]);
      let songCoverArt  = createElement('img',[],[],{src: coverArt})
      let playButton = createElement('button',["🔊"],["play-button"],{ type: 'button' });
      let removeButton = createElement('button',["✖"],["remove-button"],{ type: 'button' });
      let songElement = createElement('div',[SongTitle, songAlbum, songArtist, songDuration, songCoverArt,playButton,removeButton],['songShell'],{id: id});
     // console.log(songElement);
      const eventListeners = {};
    // songElement.setAttribute('onclick', `playSong(${id})`)
      return songElement;
  }
for(let song of player.songs){
  let songsDiv = document.getElementById('songs');
  songsDiv.append(createSongElement(song));
}
/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
  let playlistName = createElement('h2',[name]);
  let playlistSongs = createElement('h3',["Amount of songs: " + songs.length]);
  let playlistFulllDuration = createElement('h3',["Duration - " + playlistDuration(id)]);
  let  playlistElem = createElement('div',[playlistName, playlistSongs, playlistFulllDuration],['playlistShell']);
  const eventListeners = {}
  return playlistElem;
}
for(let playlist of player.playlists){
  let playlistList = document.getElementById('playlists');
   playlistList.append(createPlaylistElement(playlist));
}
/**
* Creates a new DOM element.
*
* Example usage:
* createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
*
* @param {String} tagName - the type of the element
* @param {Array} children - the child elements for the new element.
*                           Each child can be a DOM element, or a string (if you just want a text element).
* @param {Array} classes - the class list of the new element
* @param {Object} attributes - the attributes for the new element
*/
function createElement(tagName, children = [], classes = [], attributes = {}) {
let newEl = document.createElement(tagName);
for(let child of children){
  if (typeof(child) === "string") {
    child = document.createTextNode(child);
}
     newEl.append(child);
}
for(let cls of classes){
    newEl.classList.add(cls);
}
for(let attr in attributes){
    newEl.setAttribute(attr, attributes[attr]);
}
return newEl
}
//createSongElement('h2', [player.songs[0].title], "songTitles");
document.getElementById("add-button").addEventListener("click", handleAddSongEvent);

function removeSong(songId) {

  let removedSong = document.getElementById(songId);
  removedSong.style = 'display: none';
  for (let playlist of player.playlists) {
      for (let i = 0; i <= playlist.songs.length; i++) {
          if (playlist.songs[i] == songId) {
              playlist.songs.splice(i, 1);
              console.log(playlist.songs);
          }
      }
  }
  let removePlaylists = Array.from(document.querySelectorAll('.playlistShell'));
  for (let playlist of removePlaylists) {
      console.log(playlist);
      playlist.style = 'display: none';
  }
  //generates the playlists list
  for (let playlist of player.playlists) {
      let playlistDiv = document.getElementById('playlists');
      playlistDiv.append(createPlaylistElement(playlist));
      playlistDiv.style = "display: block";
  }

}
function addSong({ title, album, artist, duration, coverArt }) {
  // Your code here
  let SongTitle = createElement('h2',[title],['songTitles']);
      let songAlbum = createElement('h3',["Album: " + album]);
      let songArtist = createElement('h4',["Artist: " + artist]);
      let songDuration = createElement('h4',[secondsToMinutesConvertor(duration)]);
      let songCoverArt  = createElement('img',[],[],{src: coverArt})
      let playButton = createElement('button',["🔊"],["play-button"],{ type: 'button' });
      let removeButton = createElement('button',["✖"],["remove-button"],{ type: 'button' });
      let songElement = createElement('div',[SongTitle, songAlbum, songArtist, songDuration, songCoverArt,playButton,removeButton],['songShell'],{id: id});
  const eventListeners = {};
  let addingSong = document.getElementById('songs');
  addingSong.append(songElement);
}
function handleSongClickEvent(event) {
  // Your code here
  let newSongObj = {
      'title': document.getElementsByName('title')[0].value,
      'album': document.getElementsByName('album')[0].value,
      'artist': document.getElementsByName('artist')[0].value,
      'duration': document.getElementsByName('duration')[0].value,
      'coverArt:': document.getElementsByName('cover-art')[0].value
  }
  console.log(newSongObj);
  addSong(newSongObj);
}

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', handleSongClickEvent);

function handleAddSongEvent(event) {
  // Your code here
}


let songSlist = document.getElementById('songs');
songSlist.addEventListener('click', (e) => {
    if (e.target.className === 'play-button') {
        console.log(e.target.parentElement);
        playSong(e.target.parentElement.id)
    } else if (e.target.className === 'remove-button') {
        removeSong(e.target.parentElement.id);
    }
});
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
 
 
//song duration color functionlity
let songDuration = document.querySelectorAll(".songShell span");
let SongDurationArray = Array.from(songDuration);
for (let i = 0; i < SongDurationArray.length; i++) {
    let redAmount = player.songs[i].duration;
    SongDurationArray[i].style.color = `rgb( ${(redAmount * 0.8533) - 120} , ${420 - (redAmount * 0.8533)} ,0)`;
}
