function convertDuration(duration) {
    //parameters - duration (type string('mm:ss') / number(seconds))
    //return string('mm:ss') if number was given
    //return number(seconds) if string was given
    if(typeof(duration) === 'number'){
        let min  = Math.floor(duration / 60);
        let sec = duration % 60;
        if (min < 10) {
        min = "0" + String(min);
        }
        if (sec < 10) {
        sec = "0" + String(sec);
        }
        return min + ':' + sec;
    }
    else{//if its a string
        return parseInt(duration.slice(3)) + parseInt(duration.slice(0,2)) * 60;
    }
}

function getEl(arr, id){
    //parameters - arr (type array(of objects))
    //             id (type number)
    //returns the object in the array that has the wanted id.
    for(let el of arr){
      if(el.id === id){
        return el;
      }
    }
    throw("couldn't find element where id=" + id);
  }

function newWindow(){
    let songEl = document.getElementById("songs")
    while(songEl.firstChild){
        songEl.removeChild(songEl.firstChild);
    }

    let plEl = document.getElementById("playlists")
    while(plEl.firstChild){
        plEl.removeChild(plEl.firstChild);
    }
}

function songsHandler(){
    newWindow()
    for(const song of player.songs){
        document.getElementById("songs").appendChild(createSongElement(song))
    }
}

function playlistsHandler(){
    newWindow()
    for(const playlist of player.playlists){
        document.getElementById("playlists").appendChild(createPlaylistElement(playlist))
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
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})` }

    const topic = document.createElement("h1");
    topic.textContent = "song #" + id + "\n";
    children.push(topic)

    const info = document.createElement("p");
    info.textContent = "name: " + title + "\nalbum: " + album + "\nartist: " + artist + "\nduration: " + convertDuration(duration);
    children.push(info)

    const img = document.createElement("img");
    img.src = coverArt;
    children.push(img)

    //createElement('div',children,classes,attrs)
    //document.getElementById("songs").appendChild(createElement("div", children, classes, attrs));
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = ["playlist"]
    const attrs = {}
    
    const topic = createElement("header");
    topic.textContent = "playlist #" + id + "  -  " + name;
    children.push(topic)

    const info = createElement("p");
    info.textContent = "songs -";
    children.push(info)
    for(let i = 1; i <= songs.length; i++){

        children.push(createSongElement(getEl(player.songs,songs[i-1])));
    }

    console.log(children);
    
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
    let newEl = document.createElement(tagName);
    for(const child of children){
        newEl.appendChild(child);
    }
    for(const cls of classes){
        newEl.classList.add(cls);
    }
    newEl.attributes = attributes;
    //document.getElementById("songs").appendChild(newEl);
    return newEl
}

// You can write more code below this line
for(const song of player.songs){
    document.getElementById("songs").appendChild(createSongElement(song));
}
