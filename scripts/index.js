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
      let songElement = createElement('div',[SongTitle, songAlbum, songArtist, songDuration, songCoverArt],['songShell'],{id: id});
      console.log(songElement);
      songElement.setAttribute('onclick', `playSong(${id})`)
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
createSongElement('h2', [player.songs[0].title], "songTitles");

