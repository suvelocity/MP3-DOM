/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 function playSong(songId) {
   let id = songId.id.slice(4);
    id = parseInt(id, 10);
   console.log(id);
    songId.style.backgroundColor = "yellow";
    console.log("Now playing :" + songId.innerText);
    }

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
  //ID checker
  if(!idCheck(songId)) throw new Error("Invalid ID");
  //Delete from player
  player.songs.splice(IndexOfSong(songId), 1);
  DeleteInPlayLists(songId);
  //Remove element from DOM
  elementId = "song"+songId; 
  let songEl = document.getElementById(elementId);
  songEl.remove();
  console.log(player);
  console.log(listOfSongs);
}


/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong(title, album, artist, duration, coverArt, id = randomId()) {
  duration = reverseDurationConvertor(duration);
  //Random ID generator
  while(idCheck(id)){
    id = randomId();
  }
  //Add to player
  player.songs.push({
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: duration
  });
  //Create new DOM element and appen as child to listOfSongs, log the action
  let newSongEl = createSongElement({ id, title, album, artist, duration, coverArt });
  attachId(newSongEl, "song", id);
  listOfSongs.appendChild(newSongEl);
  console.log("New song was added! " + title + " ID: " + id);
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

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
    // Song title (<header>)
    const titleEl = createElement("header", [title], ["title-class"]);
    // Song album (<li>)
    const albumEl = createElement("li", ["From: ", album], ["item-class"]);
    // Song artist (<li>)
    const artistEl = createElement("li", ["By: ", artist], ["item-class"]);
    // Song duration (<li>)
    const durationEl = createElement("li", ["Duration: ", durationConvertor(duration)], ["duration-class"], {onclick: `console.log('${durationConvertor(duration)}')`});
  
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["image-class"], {src: coverImageArtUrl});
  
    //return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl], ["song-class"]);
    return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl], ["song-class"], {onclick: `playSong(${"song"+id})`});
  };

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    // Playlist's name (<header>)
    const nameEl = createElement("header", [name], ["title-class"]);
    //Playlist's amount of songs
    const noOfSongsEl = createElement("li", ["No. of songs: ", songsCounter(id)], ["item-class"]);
    //Playlist's duration (<li>)
    const durationsEl = createElement("li", ["Duration: ",durationConvertor(playlistDuration(id))], ["item-class"]);
    

    return createElement("div", [nameEl, noOfSongsEl, durationsEl], ["playlist-class"]);
};

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

 function createElement(tagName, children = [], classes = [], attributes = {}) {
    //Create element
    const el = document.createElement(tagName);

    // Children
    for(const child of children) {
      el.append(child);
    }
  
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
  
    return el;
  }


// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
 function generateSongs(playerObj, songsList) {
  for(let song of playerObj.songs){
    let songEl = createSongElement(song);
    attachId(songEl, "song", song.id);
    songsList.appendChild(songEl);
  }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
 function generatePlaylists(playerObj, playlistsList) {
  for(let playlist of player.playlists){
    let playlistEl = createPlaylistElement(playlist);
    attachId(playlistEl, "playlist", playlist.id)
    playlistsList.appendChild(playlistEl);
}
}


//-----------Creatin page structure---------\\

//-----------Main container---------\\
const body = document.getElementById('body');
const intro = createElement("p", ["This MP3 player was created to light up your mood, do not hesitate to use it :)"], ["paragraph"], {});
const mainH1 = createElement("h1", ["Aviv's MP3 Player"], ["headline"], {});
const mainHeader = createElement("header", [mainH1], ["header"], {});
const mainContainer = createElement("div", [mainHeader, intro], ["container"], {});
mainContainer.id = "main-container";
body.appendChild(mainContainer);
body.insertBefore(mainContainer, body.firstElementChild);

//---------Add a new song------\\
const songSection = document.getElementById("add-section");
songSection.className = "container";

//--------Songs container------\\
const songsContainer = document.getElementById('songs');
const songsH2 = createElement("h2", ["Songs"], ["headline"], {});
const songsHeader = createElement("header", [songsH2], ["header"], {});
const listOfSongs = createElement("ul", [], ["list"], {});

songsContainer.className = "container";
songsContainer.appendChild(songsHeader);
songsContainer.appendChild(listOfSongs);

generateSongs(player, listOfSongs);


//--------Playlists container------\\
const playlistsContainer = document.getElementById("playlists"); 
const playlistsH3 = createElement("h3", ["Playlists"], ["headline"], {});
const playlistsHeader = createElement("header", [playlistsH3], ["header"], {});
const listOfPlaylists = createElement("ul", [], ["list"], {});

playlistsContainer.className = "container";
playlistsContainer.appendChild(playlistsHeader);
playlistsContainer.appendChild(listOfPlaylists);


generatePlaylists(player, listOfPlaylists)


addSong("Vzxzza", "Gzxzxzxfolk", "zxzxikr", "03:20", "./images/cover_art/songleikr_vinda.jpg")

//-------------Functions----------------\\

//Converts the duration format to mm:ss
function durationConvertor(duration){
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  };

//Duration reverse convertor (from mm:ss to seconds)
  
function reverseDurationConvertor(duration){
  duration = duration.split(":");
  let minutes = parseInt(duration[0]) * 60;
  let seconds = parseInt(duration[1]);
  return minutes + seconds;
}


//Returns the duration of a song
function getDuration(id){
    for(let song of player.songs){
      if(song.id == id){
        return song.duration;
      }
    }
  };

//Counts the amount of songs in a playlist and returns the counter
function songsCounter(id){
    let count = 0;
    for(let playlist of player.playlists){
        if(playlist.id == id){
            for(let i = 0; i < playlist.songs.length; i++){
                count++;
            }
        }
    }
    return count;
};

//Returns the duration of a playlist
function playlistDuration(id) {

    let durations = 0;
    for(let playlist of player.playlists){
        if(playlist.id == id){
            for(let i = 0; i < playlist.songs.length; i++){
      durations += getDuration(playlist.songs[i]);
            }
        }
    }
    return durations;
  };

//ID attacher 
function attachId(element, string, id){
    element.id = string + id;
}

//Returns true if id exists and false if not
function idCheck(id){
  for(let song of player.songs){
      if(song.id == id){
        return true;
      }
  }
  return false;
}

//Returns an index of a song in songs by id
function IndexOfSong(id) {
  for(let song of player.songs){
   if(song.id == id){ 
     return player.songs.indexOf(song);
     }
   }
 }

 //Deleting the specific song from playlists
function DeleteInPlayLists(id) {
  for(let playlistSongs of player.playlists){
    for(let i = 0; i < playlistSongs.songs.length; i++){
      if(playlistSongs.songs[i] == id){
        playlistSongs.songs.splice(i, 1);
      }
    }
  }
 };

 /*
function removeSong(id) {
  if(!idCheck(id)) throw new Error("Invalid ID");
  player.songs.splice(IndexOfSong(id), 1);
  DeleteInPlayLists(id);
}
*/

//Random ID generator between 1-100
function randomId(){
  return Math.floor(Math.random() * 101);
}

