/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // change bar-left song descriptions according to the song selected by id.
    let song = getSongById(songId)
    let songInfo = document.getElementsByClassName("song-details")
    songInfo[0].innerText = song.title
    songInfo[1].innerText = song.artist
    songInfo[2].innerText = song.album
}

playSong(5)
/**
 * Creates a song DOM element based on a song object.
 * coverArt gets file path as argument
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    console.log(id, title, album, artist, duration, coverArt)
    let imgTemplate = createElement("img", [], ["album-img"], { src: coverArt })
    let spanWithImg = createElement("span", [imgTemplate], ["data-cell", "album-img-container"], [])
    let spanTitle = createElement("span", [title], ["data-cell", "song-title"])
    let spanAlbum = createElement("span", [album], ["data-cell", "song-album"])
    let spanArtist = createElement("span", [artist], ["data-cell", "song-artist"])
    let spanDuration = createElement("span", [duration], ["data-cell", "song-duration"])

    const children = [spanWithImg, spanTitle, spanAlbum, spanArtist, spanDuration]

    console.log(`children are: ${children}`)

    const classes = ["song-data-container"]
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * createElement("div", ["just text"], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    newElement = document.createElement(tagName)
    newElement.append(...children)

    for (className of classes) {
        newElement.classList.add(className)
    }

    //go through the added attributes object. for each id value pair, use the setAttribute method to add the attribute to the element.
    for (i = 0; i < Object.keys(attributes).length; i++) {
        newElement.setAttribute(Object.keys(attributes)[i], Object.values(attributes)[i])
    }
    return newElement
}

// You can write more code below this line

function getSongById(id) {
    for (let song of player.songs) {
        if (song.id === id) {
            return song
        }
    }
    throw new Error(`Whoops! we couldn't find a song that matches the ID you entered. Song ID entered: ${id}`)
}
