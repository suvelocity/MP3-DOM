/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    const selectedSong = document.getElementById(songId);
    const classes = []
    classes.push(["selected"])

    const songs = document.getElementsByClassName("song");
    for (let song of songs) {
        song.classList.remove(classes)
    }
    selectedSong.classList.add(classes);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const ul = document.createElement("ul");
    for (let i = 0; i < 5; i++)
    {
        if (arguments[i] === arguments[4])
        {
            arguments[i] = durationConvertor(arguments[4]);
        }
        let list = document.createElement("li"); 
        list.innerText = arguments[i]
        ul.append(list);
    }
    let currentImg= document.createElement("img");
    currentImg.src= arguments[5];
    ul.appendChild(currentImg);
    children.push(ul)
    const classes = []
    classes.push(["song"]) // CSS later
    const attrs = { onclick: `playSong(${arguments[0]})`,}
    return createElement("div", children, classes, attrs, arguments[0])
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []

    const ul= document.createElement("ul");
    for(let i=0; i<3; i++)
    {
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    children.push(ul);
    const classes = []
    classes.push(["playlist"]) // CSS later
    const attrs = {}
    return createElement("div", children, classes, attrs, id)
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
function createElement(tagName, children = [], classes = [], attributes = {}, id) {
    const element = document.createElement(tagName);
    for (let child of children)
    {
        element.appendChild(child);
    }
    element.classList.add(classes);
    Object.entries(attributes).forEach(([key,value]) => {
        if (key !== undefined) {
            element.setAttribute(key, value);
        }
    })

    element.id = id;
    return element;
}



// You can write more code below this line

sortedSongs();

sortedPlaylists(); 

printAllSongs();

printAllPlaylists();

// const check = document.createElement("h2")
// check.textContent = "Hello World";
// const songsElement = document.getElementById("songs");
// songsElement.appendChild(check)
