/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    let song = getElementById(songId);
    song.style.backgroundColor = "dark grey";
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [];
    const classes = [];
    const attrs = { onclick: `playSong(${id})` }
    // Your code here
    return createElement("div", children, classes, attrs)
};

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [];
    const classes = [];
    const attrs = {};
    return createElement("div", children, classes, attrs);
};

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
    let element = document.creatElement(tagName);
    for(let child of children){
        element.appendChild(child);
    }
    for(let clas of classes){
        element.className(clas);
    }
    for(let attribute of attributes){
        element.setAttribute(attribute);
    }
    return element;
};

// You can write more code below this line


/*
export{
    songId,
    tagName,
    children,
    classes,
    attributes,
    createSongElement
    createPlaylistElement,
    createElement,
}
*/   