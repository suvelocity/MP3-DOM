


function playSong(songId) {
   let otherSongs = document.getElementsByClassName('songShell');
   for(let otherSong of otherSongs){
       otherSong.style.backgroundColor = "rgba(0, 0, 0, 0)";
   }
   document.getElementById(songId).style.backgroundColor = "red";

   if(songId < 7){
       window.setTimeout(function(){playSong(songId + 1);} ,getSongObjectById(songId).duration * 1000);
   }
   // Your code here
}

/**
* Creates a song DOM element based on a song object.
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
   const children = [];
   const classes = [];
   const songsDiv = document.getElementById("songs");
   let uniqueSongDiv = document.createElement('div');
   uniqueSongDiv.setAttribute('class', 'songShell');
   uniqueSongDiv.setAttribute('id',id);
   let songTitle = document.createElement('h1');
   let songAlbum = document.createElement('h2');
   let songArtist = document.createElement('h2');
   let songDuration = document.createElement('p');
   let songCoverArt = document.createElement('img');
       songTitle.innerText = title;
       songAlbum.innerText = "album: " + album;
       songArtist.innerText = "by: " + artist;
       songDuration.innerText = secondsToMinutesConvertor(duration);
       songCoverArt.setAttribute('src' , coverArt);
       songsDiv.appendChild(uniqueSongDiv);
       uniqueSongDiv.appendChild(songTitle);
       uniqueSongDiv.appendChild(songAlbum);
       uniqueSongDiv.appendChild( songArtist);
       uniqueSongDiv.appendChild( songDuration);
       uniqueSongDiv.appendChild(songCoverArt);
       uniqueSongDiv.setAttribute('onclick', `playSong(${id})`)
   const attrs = { onclick: `playSong(${id})` }
   return createElement("div", children, classes, attrs)
}
for(let song of player.songs){
   createSongElement(song);
}
/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
   const children = []
   const classes = []
   const attrs = {}
   let playlistDiv = document.getElementById("playlists");
   let uniquePlaylistDiv = document.createElement('div');
   uniquePlaylistDiv.setAttribute('class', 'playlistShell');
   uniquePlaylistDiv.setAttribute('name', name);
   let playlistName = document.createElement('h1');
   let playlistSongs = document.createElement('h2');
   let playlistTotalDuration = document.createElement('p');
   playlistName.innerText = name + "-playlist";
   playlistSongs.innerText = "amount of songs: " + songs.length;
   playlistTotalDuration.innerText = "duration - " + playlistDuration(id);
   playlistDiv.appendChild(uniquePlaylistDiv);
   uniquePlaylistDiv.appendChild(playlistName);
   uniquePlaylistDiv.appendChild(playlistSongs);
   uniquePlaylistDiv.appendChild(playlistTotalDuration);
   return createElement("div", children, classes, attrs)
}
for(let playlist of player.playlists){
   createPlaylistElement(playlist);
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
   // Your code here
}
// You can write more code below this line
let songDuration = document.querySelectorAll(".songShell p");
let SongDurationArray = Array.from(songDuration);
for(let i = 0; i < SongDurationArray.length; i++){
   let redAmount = player.songs[i].duration;
   SongDurationArray[i].style.color = ("rgb(" + redAmount * 0.74 + ","+(100000/redAmount)+ ",0)");
}