/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId, songElem) {
    alert(`The song ${getSong(songId).title} is playing`)
    const allDivs = document.getElementsByTagName('div')
    for (let i of allDivs)
        i.style.backgroundColor = 'blue'
    songElem.style.backgroundColor = 'red'
    // setTimeout(() => playSong(songId++, songElem), 3000)

}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId, songElem) {
    player.songs = player.songs.filter(a => songId !== a.id)
    for (let i of player.playlists)
        i.songs = i.songs.filter(a => songId !== a)
    songElem.remove()
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong() {
    id = makeID(player.songs)
    const inputArr = Array.from(document.getElementsByClassName('input'))
    const songObj = { 'id': id, 'title': inputArr[0].value, 'album': inputArr[1].value, 'artist': inputArr[2].value, 'duration': inputArr[3].value, 'coverArt': inputArr[4].value }
    player.songs.push(songObj)
    const songElem = (createSongElement(songObj))
    let songList = document.getElementById('songs').cloneNode(true)
    console.log(songList)
    songList.append(songElem)
    console.log(songList)
    document.getElementById('songs').replaceWith(songList)

}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    const songTitle = event.target.parentNode.firstChild.innerHTML
    const songObj = player.songs.find(a => a.title === songTitle)
    if (event.target.className === 'play-button') {
        playSong(songObj.id, event.target.parentNode)
    }
    if (event.target.className === 'remove-button') {
        removeSong(songObj.id, event.target.parentNode)
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    event.target.onclick = addSong()
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ title, album, artist, duration, coverArt }) {
    const children = [createElement('span', [title]), createElement('span', [album]), createElement('span', [artist]), createElement('span', [convertToMin(duration)],), createElement('img', [], [], { src: coverArt }), createElement('button', ['Play Song'], ['play-button']), createElement('button', ['remove song'], ['remove-button'])]
    const classes = ['songElem', 'song']
    const attrs = { 'id': 'songs' }
    const eventListeners = { 'click': handleSongClickEvent }
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [createElement('span', [name]), createElement('span', [`Songs: ${songs.length}`]), createElement('span', `duration: ${convertToMin(playlistDuration(id))}`)]
    const classes = ['playlist']
    const attrs = { 'id': 'playlists' }
    const eventListeners = {}
    let playlistElem = createElement("div", children, classes, attrs, eventListeners)
    return playlistElem
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
    const el = document.createElement(tagName)
    for (let i of children)
        el.append(i)
    for (let i of classes)
        el.classList.add(i)
    for (let i in attributes)
        el.setAttribute(i, attributes[i])
    for (let i in eventListeners)
        el.addEventListener(i, eventListeners[i])
    return el
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    let songElemHtml = document.getElementById('songs').cloneNode(true)
    for (let i of player.songs) {
        const song = createSongElement(i)
        songElemHtml.append(song)
    }

    document.getElementById('songs').replaceWith(sortSongs(songElemHtml))

}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    let playlistElemHtml = document.getElementById('playlists')
    for (let i of sortPlaylist(player.playlists)) {
        const playlist = createPlaylistElement(i)
        playlistElemHtml.append(playlist)
    }
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


function makeID(arr) {
    for (let i = 1; i <= arr.length; i++)
        if (arr.every(a => a.id !== i))
            return i

}
function sortSongs(element) {
    let titles = []
    const sortedObjects = element
    let arr = Array.from(element.children)
    arr.forEach(a => titles.push(a.firstChild.innerHTML))
    titles = titles.sort()
    // console.log(titles)
    // console.log(arr)
    sortedObjects.innerHtml = ''
    for (let i of titles) {
        sortedObjects.append(arr.find(a => a.firstChild.innerHTML === i))
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
function convertToSec(time) {
    time = (time.split("")).map(Number)
    return (time[0] * 10 + time[1]) * 60 + time[3] * 10 + time[4]
}
//takes an amout of seconds and formats it in to a 'mm:ss' string format
function convertToMin(seconds) {
    if (typeof (seconds) === "string")
        return seconds
    let min = String(Math.floor(seconds / 60))
    let sec = String(seconds % 60)
    if (sec.length === 1)
        return min + ':0' + sec
    else
        return min + ':' + sec
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
function getSong(id) {
    return player.songs.find(a => a.id === id)
}
