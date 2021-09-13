/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */


function playSong(songId) {
    const currentSong = document.getElementById("song" + songId);
    currentSong.classList.add("now-playing");
    let endSong = setTimeout(() => currentSong.classList.remove("now-playing"), getSongUsingId(songId).duration * 1000);

}


/**
 * Creates a song DOM element based on a song object.
 */



function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("img", [], ["coverArt"], {
            alt: "cover art",
            src: coverArt,
        }),
        createElement("strong", [title]),
        createElement("span", [", album: ", album], ["album"]),
        createElement("span", [", artist: ", artist], ["artist"]),
        createElement("span", [", ", mmss(duration)], ["duration"]),

    ]
    const classes = []

    return createElement("div", children, classes, { onclick: `playSong(${id})`, id: "song" + id })
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    let numOfSongs = songs.length
    const children = [
        createElement("p", ["Playlist Name: ", name], ["name"]),
        createElement("span", [" number of songs: ", numOfSongs], ["length"]),
        createElement("span", [", sum duration: ", mmss(playlistDuration(id))], ["duration"])
    ]
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
    let elementName = document.createElement(tagName);
    //children//
    for (value of children) {
        elementName.append(value)
    }
    //classes//
    elementName.classList.add(...classes)
    //attributes//
    for (let [att, value] of Object.entries(attributes)) {
        elementName.setAttribute(`${att}`, `${value}`)
    }
    return elementName
}


// You can write more code below this line

player.songs.forEach((song) => {
    document.querySelector("#songs").append(createSongElement(song));
});

player.playlists.forEach((playlist) => {
    document.querySelector("#playlists").append(createPlaylistElement(playlist));
});


function mmss(duration) {
    let arr = [];
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    arr.push(minutes);
    arr.push(seconds);
    if (minutes < 10) {
        arr[0] = "0" + arr[0];
    }
    if (seconds < 10) {
        arr[1] = "0" + arr[1];
    }

    arr = arr.join(":");
    return arr;
}

function getSongUsingId(id) {
    let n;
    for (let i = 0; i < player.songs.length; i++) {
        if (player.songs[i].id === id) {
            currentSong = player.songs[i];
            return currentSong;
        }
    }
}

function getPlaylistLocationUsingID(id) {
    for (let n in player.playlists) {
        if (id === player.playlists[n].id) {
            return n;
        }
    }
}

function playlistDuration(id) {
    let sumDurationOfSongs = 0;
    let playlistLocation = getPlaylistLocationUsingID(id);
    let songsInPlaylist = player.playlists[playlistLocation].songs;
    for (let n of songsInPlaylist) {
        sumDurationOfSongs += getSongUsingId(n).duration;
    }
    return sumDurationOfSongs;
}


console.log(document.getElementById(7))