/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 function playSong(songId) {
    let otherSongs = document.getElementsByClassName('songShell');
    for(let otherSong of otherSongs){
        otherSong.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    document.getElementById(songId).style.backgroundColor = "red";
     console.log(songId);
        if(songId < 7){
            window.setTimeout(function(){playSong(Number(songId) + 1);} ,getSongObjectById(songId).duration * 1000);
    }
}
//adding the event listener to the songs list
let songSlist = document.getElementById('songs');
songSlist.addEventListener('click', (e) => {if(e.target.className === 'play-button'){
    console.log(e.target.parentElement);
    playSong(e.target.parentElement.id)
    }
    else if(e.target.className === 'remove-button'){
    removeSong(e.target.parentElement.id);
    }
});
/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    let removedSong = document.getElementById(songId);
removedSong.style = 'display: none';
for(let playlist of player.playlists){
    for(let i = 0; i <= playlist.songs.length; i++){
      if(playlist.songs[i] == songId){
          playlist.songs.splice(i, 1);
          console.log(playlist.songs);
      }
    }
}
let removePlaylists = Array.from(document.querySelectorAll('.playlistShell'));
for(let playlist of removePlaylists){
    console.log(playlist);
    playlist.style = 'display: none';
}
//generates the playlists list
for(let playlist of player.playlists){
    let playlistDiv = document.getElementById('playlists');
    playlistDiv.append(createPlaylistElement(playlist));
    playlistDiv.style = "display: block";
}

}

/**
* Adds a song to the player, and updates the DOM to match.
*/
function addSong({ title, album, artist, duration, coverArt }) {
let SongTitle = createElement('h1', children = [title], classes = ['songTitles'], attributes = {});
let songAlbum = createElement('h2', children = ["album: " + album], classes = [], attributes = {});
let songArtist = createElement('h2', children = ["by: " + artist], classes = [], attributes = {});
let songDuration = createElement('span', children = [duration], classes = [], attributes = {});
let songCoverArt  = createElement('img', children = [], classes = [], attributes = {src: coverArt})
let playButton = createElement('button', children = ["🔊"], classes = ["play-button"], attributes = {type:'button'});
let removeButton = createElement('button', children = ["✖"], classes = ["remove-button"], attributes = {type:'button'});
let uniqueSongDiv = createElement('div', children = [SongTitle, songAlbum, songArtist, songDuration, songCoverArt, playButton, removeButton], classes = ['songShell'], attributes = {id: `${generateId()}`});
const eventListeners = {}
let songsDiv = document.getElementById('songs');
songsDiv.append(uniqueSongDiv);
}
/**
* Acts on a click event on an element inside the songs list.
* Should handle clicks on play buttons and remove buttons of songs.
*
* @param {MouseEvent} event - the click event
*/
function handleSongClickEvent(event) {
let newSongObject = {
'title': document.getElementsByName('title')[0].value,
'album': document.getElementsByName('album')[0].value,
'artist': document.getElementsByName('artist')[0].value,
'duration': document.getElementsByName('duration')[0].value,
'coverArt:': document.getElementsByName('cover-art')[0].value
}
console.log(newSongObject);
addSong(newSongObject);
}
let addButton = document.getElementById('add-button');
addButton.addEventListener('click', handleSongClickEvent);
/**
* Handles a click event on the button that adds songs.
*
* @param {MouseEvent} event - the click event
*/
function handleAddSongEvent(event) {
// Your code here
}
/**
* Creates a song DOM element based on a song object.
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
let SongTitle = createElement('h1', children = [title], classes = ['songTitles'], attributes = {});
let songAlbum = createElement('h2', children = ["album: " + album], classes = [], attributes = {});
let songArtist = createElement('h2', children = ["by: " + artist], classes = [], attributes = {});
let songDuration = createElement('span', children = [secondsToMinutesConvertor(duration)], classes = [], attributes = {});
let songCoverArt  = createElement('img', children = [], classes = [], attributes = {src: coverArt})
let playButton = createElement('button', children = ["🔊"], classes = ["play-button"], attributes = {type:'button', id: `playButton${id}`});
let removeButton = createElement('button', children = ["✖"], classes = ["remove-button"], attributes = {type:'button'});
let uniqueSongDiv = createElement('div', children = [SongTitle, songAlbum, songArtist, songDuration, songCoverArt, playButton, removeButton], classes = ['songShell'], attributes = {id: id});
const eventListeners = {}
return uniqueSongDiv;
}
for(let song of player.songs){
let songsDiv = document.getElementById('songs');
songsDiv.append(createSongElement(song));
}
/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
let playlistName = createElement('h1', children = [name + "-playlist"], classes = [], attributes = {});
let playlistSongs = createElement('h2', children = ["amount of songs: " + songs.length], classes = [], attributes = {});
let playlistTotalDuration = createElement('span', children = ["duration - " + playlistDuration(id)], classes = [], attributes = {});
let uniquePlaylistDiv = createElement('div', children = [playlistName, playlistSongs, playlistTotalDuration], classes = ['playlistShell'], attributes = {});
const eventListeners = {}
return uniquePlaylistDiv;
}
//generates the playlists list
for(let playlist of player.playlists){
let playlistDiv = document.getElementById('playlists');
 playlistDiv.append(createPlaylistElement(playlist));
}
/**
* Creates a new DOM element.
*
* Example usage:
* createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
*
* @param {String} tagName - the type of the element
* @param {Array} children - the child elements for the new element.
*                           Each child can be a DOM element, or a string (if you just want a text element).
* @param {Array} classes - the class list of the new element
* @param {Object} attributes - the attributes for the new element
* @param {Object} eventListeners - the event listeners on the element
*/
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
let newEl = document.createElement(tagName);
for(let child of children){
  if(typeof(child) === "string"){
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
/**
* Inserts all songs in the player as DOM elements into the songs list.
*/
function generateSongs() {
// Your code here
}
/**
* Inserts all playlists in the player as DOM elements into the playlists list.
*/
function generatePlaylists() {
// Your code here
}
// Creating the page structure
generateSongs()
generatePlaylists()
// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
//song duration color functionlity
let songDuration = document.querySelectorAll(".songShell span");
let SongDurationArray = Array.from(songDuration);
for(let i = 0; i < SongDurationArray.length; i++){
let redAmount = player.songs[i].duration;
SongDurationArray[i].style.color = `rgb( ${(redAmount * 0.8533) - 120} , ${420 - (redAmount * 0.8533)} ,0)`;
}