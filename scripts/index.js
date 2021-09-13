/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
player.songs.sort(compareTitle);
player.playlists.sort(compareName);
for (let song of player.songs) {
    document.getElementById("songs").append(createSongElement(song));
}
for (let pl of player.playlists) {
    document.getElementById("playlists").append(createPlaylistElement(pl));
}





function playSong(songId) {

    alert("playing song number" + songId);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    // const pElement = createElement("p");
    // const img = createElement("img");
    // img.setAttribute("src", coverArt);
    // img.setAttribute("alt", "albumCover");
    // pElement.innerHTML = 
    // "Title :" + title + "<br>"
    // + "Album :" + album + "<br>"
    // + "Artist :" + artist + "<br>"
    // + "Duration :" + mmssFormat(duration);
    // const children = [pElement, img]
     const classes = ["songs"]
    // const attrs = { onclick: `playSong(${id})` }
    // return createElement("div", children, classes, attrs)
    createElement("br")
    const titleEL = createElement("span" , [title]);
    const albumEL = createElement("span" , [ " " + album]);
    const artistEL = createElement("span", [ " " + artist]);
    const durationEL = createElement("span", [" " + mmssFormat(duration)]);
    const img = createElement("img", [],["albumCover"], {src: coverArt });
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", ["title :", titleEL, createElement("br"),  "album :", albumEL, createElement("br"),  "artist :", artistEL, createElement("br"), "duration :", durationEL,createElement("br"), img], classes, attrs)
    }

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    // const bElement = createElement("b");
    // bElement.inn = "name :" + name + ", " + songs.length + 'songs in the playlist, ' +  mmssFormat(playlistDuration(id)); 
    // const children = [bElement]
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
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName);
    for(let child of children){
        element.append(child);
    }
    for(let cls of classes){
        element.classList.add(cls);
    } 
    for(let attribute in attributes){
        element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
}

// You can write more code below this line
function playlistDuration(id) {
    const songs = getPLById(id).songs;
    let durations = [];
    let sum = 0;
    for (let i = 0; i < player.songs.length; i++) {
      for (let j = 0; j < songs.length; j++) {
        if (songs[j] === player.songs[i].id) {
          durations.push(player.songs[i].duration);
        }
      }
    }
    for (let i = 0; i < durations.length; i++) {
      sum += durations[i];
    }
    return sum;
  }

  function getPLById(id) {
    let i = 0;
    let existId = false;
    for (i; i < player.playlists.length; i++) {
      if (player.playlists[i].id === id) {
        existId = true;
        return player.playlists[i];
      }
    }
    if (!existId) {
      throw 'error: ID is not exist';
    }
  }
  function mmssFormat(sec) {
    let hours = Math.floor(sec / 3600);
    let mins = Math.floor((sec - hours * 3600) / 60);
    let secs = sec % 60;
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }
    if (parseInt(hours) > 0) {
        return  `${hours}:${mins}:${secs}`;
    } else return `${mins}:${secs}`;
}
function compareTitle(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}
//sort by name
function compareName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}