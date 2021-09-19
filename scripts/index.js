/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    alert(`The song ${playSong(songId)} is playing`)
    const allDivs = document.getElementsByTagName('div')
    for (let i of allDivs)
        i.style.backgroundColor = 'blue'
    document.getElementById(`song-${songId}`).style.backgroundColor = 'red'
    //setTimeout(() => playSong(songId++), 3000)
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [createElement('span', [title]), createElement('span', [album]), createElement('span', [artist]), createElement('span', [convertToMin(duration)],), createElement('img', [], [], { src: coverArt })]
    const classes = []
    const attrs = { onclick: `playSong(${id})`, id: `song-${id}` }
    const el = createElement("div", children, classes, attrs)
    return el
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [createElement('span', [name]), createElement('span', [`Songs: ${songs.length}`]), createElement('span', `duration: ${convertToMin(playlistDuration(id))}`)]
    const classes = []
    const attrs = {}
    const el = createElement("div", children, classes, attrs)
    return el
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
    const el = document.createElement(tagName)
    for (let i of children)
        el.append(i)
    for (let i of classes)
        el.classList.add(i)
    for (let i in attributes)
        el.setAttribute(i, attributes[i])
    return el
}

// You can write more code below this line

//takes a string of 'mm:ss' returns the number of seconds
function convertToSec(time) {
    time = (time.split("")).map(Number)
    return (time[0] * 10 + time[1]) * 60 + time[3] * 10 + time[4]
}
//takes an amout of seconds and formats it in to a 'mm:ss' string format
function convertToMin(seconds) {
    let min = String(Math.floor(seconds / 60))
    let sec = String(seconds % 60)
    if (sec.length === 1)
        return min + ':0' + sec
    else
        return min + ':' + sec
}

//sorts songs by titles
function sortSongs(arr) {
    let titles = []
    let sortedObjects = []
    arr.forEach(a => titles.push(a.title))
    titles = titles.sort()
    for (let i of titles) {
        sortedObjects.push(arr.find(a => a.title === i))
    }
    return sortedObjects
}
function sortPlaylist(arr) {
    let names = []
    let sortedObjects = []
    arr.forEach(a => names.push(a.name))
    names = names.sort()
    for (let i of names) {
        sortedObjects.push(arr.find(a => a.name === i))
    }
    return sortedObjects
}

//songs list
const songElemHtml = document.getElementById('songs')
for (let i of sortSongs(player.songs)) {
    const song = createSongElement(i)
    songElemHtml.append(song)
}

//playlists list
const playlistElemHtml = document.getElementById('playlists')
for (let i of sortPlaylist(player.playlists)) {
    const playlist = createPlaylistElement(i)
    playlistElemHtml.append(playlist)
}

//gets song id, returns corresponding song object
function getSong(id) {
    return player.songs.find(a => a.id === id)
}
function playlistDuration(id) {
    if (player.playlists.find(a => a.id === id) === undefined)
        return 'no playlist with that id'
    let total = 0
    for (let i of getPlaylist(id).songs)
        total += getSong(i).duration
    return total
}
function getPlaylist(id) {
    return player.playlists.find(a => a.id === id)
}
function makeID(arr) {
    for (let i = 1; i <= arr.length; i++)
        if (arr.every(a => a.id !== i))
            return i
}
