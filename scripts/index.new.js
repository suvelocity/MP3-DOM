/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 let previousSong;
 function playSong(songId) {
     try{
       previousSong.classList.remove("now-playing")  
     } finally{
         const currentSong = document.getElementById("song" + songId);
     currentSong.classList.add("now-playing");
     let endSong = setTimeout(() => currentSong.classList.remove("now-playing"), getSongUsingId(songId).duration * 1000);
     previousSong= currentSong;
     }
     
 }
 


 
/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
//function removeSong(songId) {//
    function removeSong(id) {
        song= document.getElementById("song"+id);
        song.remove()
        
    }


/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
        let target= event.target.closest('button')
        if(target && songs.contains(target) && target.className==("play-button"))  playSong(Number(target.id))
        if(target && songs.contains(target) && target.className==("remove-button"))  removeSong(Number(target.id))
//&& target== document.querySelector(".play-button"))
}
let x= document.getElementById("songs")
x.addEventListener('click', handleSongClickEvent)
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

/*
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("img", [], ["coverArt"], {
            alt: "cover art",
            src: coverArt,
        }),
        createElement("span", [title]),
        createElement("span", [", album: ", album], ["album"]),
        createElement("span", [", artist: ", artist], ["artist"]),
        createElement("span", [", ", mmss(duration)], ["duration"]),
        createElement("button",["▶️"], ["play-button"],  {id} ),
        createElement("button",["❌"], ["remove-button"], {id})
        //{onclick: `removeSong(${id})`}, id )

    ]
    let s= document.createElement("div").appendChild[children]
    const classes = []
    

    return createElement("div", children, classes, {  id: "song" + id })
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
/*
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}
*/
function createPlaylistElement({ id, name, songs }) {
    let numOfSongs = songs.length
    const children = [
        createElement("p", ["Playlist Name: ", name], ["name"]),
        createElement("span", [" number of songs: ", numOfSongs], ["length"]),
        createElement("span", [", sum duration: ", mmss(playlistDuration(id))], ["duration"])
    ]
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
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
/*
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    // Your code here
}
*/
function createElement(tagName, children = [], classes = [], attributes = {}) {
    let elementName = document.createElement(tagName);
    //children//
    for (value of children) {
        elementName.append(value)
    }
    //classes//
    elementName.classList.add(...classes)
    //attributes//
    for (let [att, value] of Object.entries(attributes)) {
        elementName.setAttribute(`${att}`, `${value}`)
    }
    return elementName
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
  player.songs.forEach((song) => {
    document.querySelector("#songs").append(createSongElement(song));
});
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
   player.playlists.forEach((playlist) => {
    document.querySelector("#playlists").append(createPlaylistElement(playlist));
});
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)











// my functions//

function getSongUsingId(id) {
    let n;
    for (let i = 0; i < player.songs.length; i++) {
        if (player.songs[i].id === id) {
            currentSong = player.songs[i];
            return currentSong;
        }
    }
}


function mmss(duration) {
    let arr = [];
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    arr.push(minutes);
    arr.push(seconds);
    if (minutes < 10) {
        arr[0] = "0" + arr[0];
    }
    if (seconds < 10) {
        arr[1] = "0" + arr[1];
    }

    arr = arr.join(":");
    return arr;
}

function getPlaylistLocationUsingID(id) {
    for (let n in player.playlists) {
        if (id === player.playlists[n].id) {
            return n;
        }
    }
}

function playlistDuration(id) {
    let sumDurationOfSongs = 0;
    let playlistLocation = getPlaylistLocationUsingID(id);
    let songsInPlaylist = player.playlists[playlistLocation].songs;
    for (let n of songsInPlaylist) {
        sumDurationOfSongs += getSongUsingId(n).duration;
    }
    return sumDurationOfSongs;
}


function addAndRemove(id){
    let allSongs= documet.querySelector("#songs");
    let song= getSongUsingId(id);
    allSongs.addEventListener("click", )

}
