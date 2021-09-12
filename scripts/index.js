function durationConverter(time) {
    if (typeof time === "string") {
        const arr = time.split(":")
        const seconds = +arr[0] * 60 + +(+arr[1])
        return seconds
    } else {
        let newFormat = new Date(time * 1000).toISOString().substr(14, 5)
        return newFormat
    }
}
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
    // here will be something like changing the background color.
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = []
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
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    // Your code here
    const element = document.createElement(tagName)
    children.forEach((child) => element.append(child))
    element.classList = classes.join(" ")
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr])
    }
    return element
}
createElement("div", ["li", "p", "a"], "myClass", { gabby: "valueOfGabby" })

// You can write more code below this line

// creating a ul with nested li for songs:
// const songs = document.getElementById("songs")
// const playlists = document.getElementById("playlists")
// const songsUl = document.createElement("ul")
// songs.appendChild(songsUl)
// player.songs.forEach((song) => {
//     const li = document.createElement("li")
//     const img = document.createElement("img")
//     const div = document.createElement("div")
//     img.src = "C:/dev/cyber4s/MP3-DOM/images/cover_art/acdc_thunderstruck.jpg"
//     div.innerHTML = `${song.title} ${song.album} ${song.artist} ${durationConverter(song.duration)}`
//     li.appendChild(div)
//     li.appendChild(img)
//     songsUl.appendChild(li)
// })

// let x = `acdc_thunderstruck.jpg`
// const test = `C:/dev/cyber4s/MP3-DOM/images/cover_art/${x}`
// console.log(test)
