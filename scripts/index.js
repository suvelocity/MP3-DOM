
function playSong(songId) {
    // Your code here
}


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = []
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}


function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}


function createElement(tagName, children = [], classes = [], attributes = {}) {
    // Your code here
}

