/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */


 function playSong(songId) {
   //Converting the id to the song ID and to the element itself
    elementId = "song"+songId;
    songEl = document.getElementById(elementId);
    //changing the backgroundColor to blue
    blueBackgroundColor(songEl);
    let duration = getDuration(songId) * 1000;
    //Playing the song for the duration of that song
    setTimeout(function(){stopBlueColor(songEl)}, duration);
    console.log("Now playing :" + songEl.innerText);
    }

    //Changes the background color 
    function blueBackgroundColor(elem){
      elem.style.backgroundColor = "blue";
     }

     //Stop the color change (returns to noraml)
    function stopBlueColor(elem){
      elem.style.backgroundColor = "whitesmoke";
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
  console.log("A song was removed! " + "ID: " + songId);
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
};


/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
 function handleSongClickEvent(e) {
      const target = e.target;
      let buttonClass = target.classList[1];
      let parentId;
      if(buttonClass === "btn-play"){
        parentId = getParentId(target);
        playSong(parentId);
      }else if(buttonClass === "btn-remove"){
        parentId = getParentId(target);
        removeSong(parentId);
      }    
 }

//returns the ID of the song from the song element's ID

function songIdReturn(songId){
  let id = songId.slice(4);
  id = parseInt(id, 10);
  return(id);
}

function getParentId(target){
  let parentId = target.parentElement.id;
  parentId = songIdReturn(parentId);
  return(parentId);
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(e) {
    e.preventDefault();
    let title = newTitle.value;
    let album = newAlbum.value;
    let artist = newArtist.value;
    let duration = newDuration.value;
    let coverArt = newCoverArt.value;
    addSong(title, album, artist, duration, coverArt);
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
  //Song cover (<img>)
  const coverImageArtUrl = coverArt;
  const imgEl = createElement("img", [] ,["image-class"], {src: coverImageArtUrl});
  //Play button
  const playBtn = createElement("button", ["PLAY"], ["btn", "btn-play"],{});
  //Delete button
  const removeBtn = createElement("button", ["X"], ["btn", "btn-remove"], {});
  //return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl], ["song-class"]);
  return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl, playBtn, removeBtn], ["song-class"], {click: `playSong(${id})`});
};

/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
  // Playlist's name (<header>)
  const nameEl = createElement("header", [name], ["title-class"]);
  //Playlist's songs (<songs>)
  const playlistSongs = createElement("li", ["Songs: " + songs], ["item-class", "playlist-songs"]);
  //Playlist's amount of songs
  const noOfSongsEl = createElement("li", ["No. of songs: ", songsCounter(id)], ["item-class"]);
  //Playlist's duration (<li>)
  const durationsEl = createElement("li", ["Duration: ",durationConvertor(playlistDuration(id))], ["item-class"]);
  

  return createElement("div", [nameEl, playlistSongs, noOfSongsEl, durationsEl], ["playlist-class"]);
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

 function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
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

    //Evenetlisteners ???
    for(const [key, value] of Object.entries(eventListeners)){
      el.addEventListener(`${key}`, `${value}`);
    }
    
    return el;
  }

//Takes an input and creates


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

//------Add a new song container------\\
const songSection = document.getElementById("add-section");
songSection.className = "container";

//I tried to take the value of the inputs but could not reach them

//const newTitle = document.getElementsByName("title")[0].value;
//const newAlbum = document.getElementsByName("album")[0].value;
//const newArtist = document.getElementsByName("artist")[0].value;
//const newDuration = document.getElementsByName("duration")[0].value;
//const newCoverArt = document.getElementsByName("cover-art")[0].value;

//So I'm making an array of inputs
inputCollection = document.getElementsByTagName("input");
//Now I'm placing it in a regular arr
let inputArr = [];
for(input of inputCollection){
  inputArr.push(input);
}
//And giving them IDs
for(let i = 0; i < inputArr.length; i++){
  inputArr[i].id = "input"+i;
}

const newTitle = document.getElementById("input0");
const newAlbum = document.getElementById("input1");
const newArtist = document.getElementById("input2");
const newDuration = document.getElementById("input3");
const newCoverArt = document.getElementById("input4");



//--------Songs container------\\
const songsContainer = document.getElementById('songs');
const songsH2 = createElement("h2", ["Songs"], ["headline"], {});
const songsHeader = createElement("header", [songsH2], ["header"], {});
const listOfSongs = createElement("ul", [], ["list"], {});

songsContainer.className = "container";
songsContainer.appendChild(songsHeader);
songsContainer.appendChild(listOfSongs);
//add event listener
songsContainer.addEventListener("click", handleSongClickEvent);

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


//Random ID generator between 1-100
function randomId(){
  return Math.floor(Math.random() * 101);
}

//Just for fun =]

body.addEventListener("mousemove", changeBackgroundColor);


function changeBackgroundColor(e){
  mainContainer.style.backgroundColor = "rgb("+e.offsetY+", "+e.offsetX+", 20)";
  songs.style.backgroundColor = "rgb("+e.offsetX+", "+e.offsetY+", 40)";
  playlists.style.backgroundColor = "rgb("+e.offsetX+", "+e.offsetY+", 40)";
  songSection.style.backgroundColor = "rgb("+e.offsetX+", "+e.offsetY+", 40)";
}