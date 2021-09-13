const convertDuration = (duration) => {

    let min = String(Math.floor(duration / 60));
    let sec = String(duration % 60);
  
    min < 10 ? (min = '0' + String(min)) : min
    sec < 10 ? (sec = '0' + String(sec)) : sec
  
    return min + ':' + sec

  }
  
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

