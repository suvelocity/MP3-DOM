/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    const song = findSongByID(songId)
    document.getElementById("current-song").innerText = song.title
}

function findSongByID(songId) {
    return player.songs.find((song) => song.id === songId)
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    player.songs = player.songs.filter((song) => song.id !== songId)
    Rsong = document.getElementById(songId).remove();

}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    const id = player.songs.length + 1
    player.songs.push({ title, album, artist, duration, coverArt, id })
    document.getElementById("song-list").append(createSongElement({ title, album, artist, duration, coverArt, id }))
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event, songId) {
    // Your code here
    if (event.target.innerText === "play") playSong(songId)
    if (event.target.innerText === "remove") removeSong(songId)
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    const inputDiv = document.getElementById("inputs")
    const title = inputDiv.children["title"].value
    const album = inputDiv.children["album"].value
    const artist = inputDiv.children["artist"].value
    const duration = inputDiv.children["duration"].value
    const coverArt = inputDiv.children["cover-art"].value
    addSong({ title, album, artist, duration, coverArt })
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const songActions = createSongActionsElement(id)
    const songDetails = createSongDetails(title, album, artist)
    const img = createElement("img", [], ["albumCover"], { src: coverArt })
    const durationEL = createElement("span", [" " + mmssFormat(duration)])
    const leftDiv = createElement("div", [songDetails, img], [])
    const rightDiv = createElement("div", [songActions, durationEL], [])
    const children = [leftDiv, rightDiv]
    const eventListeners = {}
    const classes = ["songs"]
    const attrs = { id }
    return createElement("div", children, classes, attrs, eventListeners)
}

function createSongActionsElement(songId) {
    const playButton = createElement("button", ["play"], [], {}, {})
    const removeButton = createElement("button", ["remove"], [], {}, {})
    const songActions = createElement(
        "div",
        [playButton, removeButton],
        [],
        {},
        { click: (event) => handleSongClickEvent(event, songId) }
    )
    return songActions
}
function createSongDetails(title, album, artist) {
    const titleEL = createElement("span", ["title: " + title])
    const albumEL = createElement("span", ["album: " + album])
    const artistEL = createElement("span", ["artist: " + artist])
    const songDetails = createElement("div", [titleEL, albumEL, artistEL], [])
    return songDetails
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    //const children = []
    //const eventListeners = {}
    //return createElement("div", children, classes, attrs, eventListeners)
    const classes = ["playlist"]
    const nameEL = createElement("span", [name]);
    const songLength = createElement("span", [songs.length]);
    const durationElem = createElement("span", ["" + mmssFormat(playlistDuration(id))]);
    const attrs = {}
    return createElement("div", ["playlist name :",  nameEL,createElement("br"),  " songs in playlist : ", songLength, " playlist duration :", durationElem], classes, attrs)
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
    const element = document.createElement(tagName)
    for (let child of children) {
        element.append(child)
    }
    for (let cls of classes) {
        element.classList.add(cls)
    }
    for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    for (let listener in eventListeners) {
        element.addEventListener(listener, eventListeners[listener])
    }
    return element
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    player.songs.sort(compareTitle);
    const songList = document.getElementById("song-list")
    for (let song of player.songs) {
        songList.append(createSongElement(song))
    }
    
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
    player.playlists.sort(compareName);
    const pList = document.getElementById("playlists")
    for (let pl of player.playlists) {
        pList.append(createPlaylistElement(pl))
    }
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
function playlistDuration(id) {
    const songs = getPLById(id).songs
    let durations = []
    let sum = 0
    for (let i = 0; i < player.songs.length; i++) {
        for (let j = 0; j < songs.length; j++) {
            if (songs[j] === player.songs[i].id) {
                durations.push(player.songs[i].duration)
            }
        }
    }
    for (let i = 0; i < durations.length; i++) {
        sum += durations[i]
    }
    return sum
}

function getPLById(id) {
    let i = 0
    let existId = false
    for (i; i < player.playlists.length; i++) {
        if (player.playlists[i].id === id) {
            existId = true
            return player.playlists[i]
        }
    }
    if (!existId) {
        throw "error: ID is not exist"
    }
}
function mmssFormat(sec) {
    let hours = Math.floor(sec / 3600)
    let mins = Math.floor((sec - hours * 3600) / 60)
    let secs = sec % 60
    if (hours < 10) {
        hours = "0" + hours
    }
    if (mins < 10) {
        mins = "0" + mins
    }
    if (secs < 10) {
        secs = "0" + secs
    }
    if (parseInt(hours) > 0) {
        return `${hours}:${mins}:${secs}`
    } else return `${mins}:${secs}`
}
function compareTitle(a, b) {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1
    }
    return 0
}
//sort by name
function compareName(a, b) {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}
