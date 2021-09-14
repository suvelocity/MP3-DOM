/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here

    const cur = document.getElementById("currently-playing");
    const song = player.songs.filter((song) => song.id === songId)[0].title;
    const artist = player.songs.filter((song) => song.id === songId)[0].artist;
    cur.innerHTML = "<b>Currently playing : " + song + " by " + artist;

}

/**
 * Creates a song DOM element based on a song object.
 */function createSongElement(id, title, album, artist, duration, coverArt) {
    const realTime = convertTime(duration);
    const artistEl = createElement('div', [artist]);
    const titleEl = createElement('div', [title]);
    const albumEl = createElement('div', [album]);
    const durationEl = createElement("div", [realTime], ["duration", "short-duration"], { onclick: `console.log('${duration}')` });
    const imgEl = createElement("img", [], ["album-art"], { src: coverArt, align: 'left' });
    const dataEl = createElement("div", [titleEl, albumEl, artistEl, durationEl], ['data-wrapper'])
    return createElement("div", [imgEl, dataEl], ["song-wrapper"], { 'data-id': id, onclick: 'playSong(' + id + ')' });
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs=[] }) {
    const nameEl = createElement("span", [name]);
    const playlistTime = playlistDuration(id);
    const realPlaylistTime=convertTime(playlistTime);
    const songsEl = createElement("div", ["duration:", realPlaylistTime]);
    return createElement("div", [ nameEl, songsEl],[`data-warpper`,`song-wrapper`]);
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
    const el = document.createElement(tagName);
    for (const child of children) {
        el.append(child);
    }
    for (const cls of classes) {
        el.classList.add(cls);
    }
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    return el;
}
function convertSeconds(duration) {
    let array = duration.split(":");
    let minutes = parseInt(array[0]);
    let seconds = parseInt(array[1]);
    return minutes * 60 + seconds;
}

function convertTime(duration) {
    let seconds = duration % 60;
    if (seconds < 10)
        seconds = `0${seconds}`;
    let minutes = (duration - seconds) / 60;
    if (minutes < 10)
        minutes = `0${minutes}`;
    return `${minutes}:${seconds}`;
}

function playlistDuration(id) {
    let sum = 0;
    for (let i = 0; i < player.playlists.length; i++) {
        if (player.playlists[i].id === id) {
            for (let j = 0; j < player.playlists[i].songs.length; j++) {
                for (let k = 0; k < player.songs.length; k++) {
                    if (player.playlists[i].songs[j] === player.songs[k].id) {
                        sum += player.songs[k].duration;
                    }
                }

            }
        } return sum;
    }
}
const myDiv = document.getElementById("songs");
player.songs.forEach(song => {
    myDiv.append(createSongElement(song.id, song.title, song.album, song.artist, song.duration, song.coverArt));

});
const myDiv2=document.getElementById("playlists");
player.playlists.forEach(playlist=>{
 myDiv2.append(createPlaylistElement(playlist.id,playlist.name,playlist.songs)); 
});


