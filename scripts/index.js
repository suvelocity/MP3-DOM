/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    let songEl = document.getElementById("song"+songId);
    songEl.style.backgroundColor = "yellow";
    console.log("Now playing :", '\n' + songEl.innerText)
    }
    

/**
 * Creates a song DOM element based on a song object.
 */

/*          First try
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    
    -------Song elements-------\\
     const songTitle = document.createElement("header");
     songTitle.innerHTML = title;
     songTitle.className = "song-title";
    
     const songAlbum = document.createElement("li");
     songAlbum.innerHTML = album;
     songAlbum.className = "song-item";

     const songArtist = document.createElement("li");
     songArtist.innerHTML = artist;
     songArtist.className = "song-item"; 

     const songDuration = document.createElement("li");
     songDuration.innerHTML = durationConvertor(duration);
     songDuration.className = "song-duration";

     const songCover = document.createElement("img");
     songCover.innerHTML = coverArt;
     songCover.className = "song-cover";


     const children = [songTitle, songAlbum, songArtist, songDuration, songCover];
     const classes = ["song-class"];
     const attrs = { onclick: `playSong(${id})` }

     return createElement("div", children, classes, attrs)
};
*/

//          Second try
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
    return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl], ["song-class"], {onclick: `playSong(${id})`});
  }

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

//console.log(createPlaylistElement({id: 5, name: "Israeli"}));
//console.log(playlistDuration(5));


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

/*            First try
function createElement(tagName, children = [], classes = [], attributes = {}) {
     let element = document.createElement(tagName);
     for(let child of children){
         element.appendChild(child);
     }
     for(let clas of classes){
         element.className = clas;
     }

     //coudln't figure this out
    
     for(let attri in attributes){
     element.setAttribute(attri, attributes[attri]);
     }
     return element;
};
*/

//            Second try
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


// You can write more code below this line

//Duration convertor (from seconds to mm:ss)



//Get existing elements in the html index and place them in variables
let body = document.getElementById('body');
let songsContainer = document.getElementById('songs');
let playlistsContainer = document.getElementById("playlists"); 

//-----------Main container------\\

const intro = createElement("p", ["This MP3 player was created to light up your mood, do not hesitate to use it :)"], ["paragraph"], {});
const mainH1 = createElement("h1", ["Aviv's MP3 Player"], ["headline"], {});
const mainHeader = createElement("header", [mainH1], ["header"], {});
const mainContainer = createElement("div", [mainHeader, intro], ["container"], {});
body.appendChild(mainContainer);
body.insertBefore(mainContainer, songsContainer);

//--------Songs container------\\

const songsH2 = createElement("h2", ["Songs"], ["headline"], {});
const songsHeader = createElement("header", [songsH2], ["header"], {});
const listOfSongs = createElement("ul", [], ["list"], {});
for(let song of player.songs){
    let songEl = createSongElement(song);
    attachId(songEl, "song", song.id);
    listOfSongs.appendChild(songEl);
}
songsContainer.className = "container";
songsContainer.appendChild(songsHeader);
songsContainer.appendChild(listOfSongs);

//--------Playlists container------\\
const playlistsH3 = createElement("h3", ["Playlists"], ["headline"], {});
const playlistsHeader = createElement("header", [playlistsH3], ["header"], {});
const listOfPlaylists = createElement("ul", [], ["list"], {});

playlistsContainer.className = "container";
playlistsContainer.appendChild(playlistsHeader);
playlistsContainer.appendChild(listOfPlaylists);
for(let playlist of player.playlists){
    let playlistEl = createPlaylistElement(playlist);
    attachId(playlistEl, "playlist", playlist.id)
    listOfPlaylists.appendChild(playlistEl);
}


//-------Functions------\\
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
  

// let test = document.getElementById("song2");
// test.style.backgroundColor = "yellow";