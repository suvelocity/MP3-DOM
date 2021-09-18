/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
    const cur = document.getElementById("currently-playing");
    const song = player.songs.filter((song) => song.id === songId)[0].title;
    const artist = player.songs.filter((song) => song.id === songId)[0].artist;
    cur.innerHTML = "<b>Currently playing : " + song + " by " + artist;
}
/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
    const deletedSong = player.songs.findIndex((song) => song.id === songId);
    player.songs.splice(deletedSong, 1);
    generateSongs();
}
/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
    const song = { title, album, artist, duration, coverArt };
    console.log("ïn add song");
    player.songs.push(song);
    generateSongs();
}
/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
    const idSelected = event.target.parentNode.getAttribute('data-id');
    const action = event.target.classList[0];
    if (idSelected) {
        const id = parseInt(idSelected);
        if (action == 'play') {
            playSong(id);
        }
        console.log(action);
        if (action == 'remove') {
            removeSong(id);
        }
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
    const title = document.getElementsByName('title')[0].value;
    const artist = document.getElementsByName('artist')[0].value;
    const album = document.getElementsByName('album')[0].value;
    const duration = convertSeconds(document.getElementsByName('duration')[0].value);
    const coverArt = document.getElementsByName('cover-art')[0].value;
    addSong({ title, album, artist, duration, coverArt });
}
/**
 * Creates a song DOM element based on a song object.
 */function createSongElement(id, title, album, artist, duration, coverArt) {
    const realTime = convertTime(duration);
    const artistEl = createElement('div', [artist]);
    const titleEl = createElement('div', [title]);
    const albumEl = createElement('div', [album]);
    const durationEl = createElement("div", [realTime], ["duration", "short-duration"], { onclick: `console.log('${duration}')` });
    const imgEl = createElement("img", [], ["album-art"], { src: coverArt, align: 'left' });
    const dataEl = createElement("div", [titleEl, albumEl, artistEl, durationEl], ['data-wrapper'])
    const playButton = createElement("button", ["Play"], ['play']);
    const removeButton = createElement("button", ["Remove"], ['remove']);
    return createElement("div", [imgEl, dataEl, playButton, removeButton], ["song-wrapper"], { 'data-id': id });
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs = [] }) {
    const nameEl = createElement("span", [name]);
    const playlistTime = playlistDuration(songs);
    const realPlaylistTime = convertTime(playlistTime);
    const songsEl = createElement("div", [realPlaylistTime]);
    return createElement("div", [nameEl, songsEl], [`data-warpper`, `song-wrapper`]);
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
    const el = document.createElement(tagName);
    for (const child of children) {
        el.append(child);
    }
    for (const cls of classes) {
        el.classList.add(cls);
    }
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    return el;
}
/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
    const myDiv2 = document.getElementById("playlists");
    player.playlists.forEach(playlist => {
        myDiv2.append(createPlaylistElement(playlist));
    });

}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

function convertSeconds(duration) {
    let array = duration.split(":");
    let minutes = parseInt(array[0]);
    let seconds = parseInt(array[1]);
    return minutes * 60 + seconds;
}
function convertTime(duration) {
    let seconds = duration % 60;
    if (seconds < 10)
        seconds = `0${seconds}`;
    let minutes = (duration - seconds) / 60;
    if (minutes < 10)
        minutes = `0${minutes}`;
    return `${minutes}:${seconds}`;
}
function playlistDuration(songs) {
    let sum = 0;
    const filteredSongs = player.songs.filter((song) => songs.includes(song.id));
    sum = filteredSongs.reduce((sum1, song) => sum1 + song.duration, 0);
    return sum;
}
/**
* Inserts all songs in the player as DOM elements into the songs list.
*/
function generateSongs() {
    const myDiv = document.getElementById("songs");
    myDiv.innerHTML = '';
    player.songs.forEach(song => {
        myDiv.append(createSongElement(song.id, song.title, song.album, song.artist, song.duration, song.coverArt));

    });
}

const mySongs = document.getElementById("songs");
mySongs.addEventListener('click', handleSongClickEvent)


// iwrote this line to make another commit so ignore it