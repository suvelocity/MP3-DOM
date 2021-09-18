/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
//a function that gets a song id and displaying in the browser.
function playSong(songId) {
    while (document.getElementById("main").firstChild) {
        document.getElementById("main").removeChild(document.getElementById("main").lastChild);
      }
    
    let r = document.createElement("div");
    let songPlayed;
    player.songs.forEach(song => {
        if(song.id == songId)
            songPlayed = song;
    });
    const children = [{
        content:"PLAYING",
        type:'h1'
    },{
        content:songPlayed.title,
        type:'p'
    },{
        content:songPlayed.album,
        type:'p'
    },{
        content:songPlayed.artist,
        type:'p'
    },{
        content:songPlayed.duration,
        type:'p'
    },{
        content:songPlayed.coverArt,
        type:'img'
    }]
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);
            
            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");
        }
        t.innerHTML = child.content;
        r.appendChild(t);
    });
    r.classList.add("card");
    document.getElementById("main").appendChild(r);
    console.log(songPlayed);
}

/**
 * Creates a song DOM element based on a song object.
 */
//a function that gets a song object and creates a div containing the song's details.
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [{
        content:title,
        type:'p'
    },{
        content:album,
        type:'p'
    },{
        content:artist,
        type:'p'
    },{
        content:calculateDuration(duration),
        type:'p'
    },{
        content:coverArt,
        type:'img'
    }]
    const classes = ['card', 'song'];
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
    
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
//a function that gets a playlist object and create a div that contains the playlist details.
function createPlaylistElement({ id, name, songs }) {
    
    const children = [{
        content:name,
        type:'p'
    },{
        content:songs.length,
        type:'p'
    },{
        content:calculateDuration(playlistDuration(id)),
        type:'p'
    }]
    const classes = ['card', 'playlist']
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
//a function that gets a tag name create it and add child tags, classes, attributes to the tag.
function createElement(tagName, children = [], classes = [], attributes = {}) {
    let r = document.createElement(tagName);
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);

            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");

        }
        t.innerHTML = child.content;
        r.appendChild(t);
    });
    classes.forEach(cls => {
        r.classList.add(cls);
    });
    
    for(const property in attributes){
        r.setAttribute(property, attributes[property]);
    }
    classes.forEach(cls => {
        if(cls == "song")
            document.getElementById("songs").appendChild(r);
        if(cls == "playlist")
            document.getElementById("playlists").appendChild(r);
    });
    
}
//a function that gets a playlist id and returns the playlist duration.
function playlistDuration(id) {
    let arr = getPlaylistAndSongIndex(id, 1);
    let index = arr[0];
    let sum = 0;
    player.songs.forEach(song => {
      player.playlists[index].songs.forEach(songID => {
        if(song.id == songID){
          sum += song.duration;
        }
      });
    });
    return sum;
  }
  //a function that gets a playlist id, and a song id and returns the index of the corresponding objects in the player's array.
  function getPlaylistAndSongIndex(playlistID, songID){
    let indexOfSong = -1;
    let indexOfPlaylist = -1;
    for (let i = 0; i < player.playlists.length; i++) {
      const playlist = player.playlists[i];
      if(playlist.id == playlistID){
        indexOfPlaylist = i;
        for (let j = 0; j < playlist.songs.length; j++) {
          const song = playlist.songs[j];
          if(song == songID){
            indexOfSong = j;
          }
        }
      }
    }
    if(indexOfPlaylist == -1){
      throw "playlist index does not exisst";
    }
    return [indexOfPlaylist,indexOfSong];
  
  }
  //a function that converts duration in sec to mm:ss format.
  function calculateDuration(duration){
  
    mmDuration = Math.floor(duration / 60);
    if(mmDuration < 10)
      mmDuration = "0" + mmDuration;
    
    ssDuration = duration - mmDuration * 60;
    if(ssDuration < 10)
        ssDuration = "0" + ssDuration;
    return mmDuration+":"+ssDuration;
  }
// You can write more code below this line
//a function that sort the array of songs and create an element for each of them separately.
function displaySongsList(songs){
    songs.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    songs.forEach(song => {
        createSongElement(song);
    });
    
}
//a function that sort the array of playlists and create an element for each of them separately.

function displayPlaylistsList(playlists){
    playlists.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    playlists.forEach(playlist => {
        createPlaylistElement(playlist);
    });
}
displaySongsList(player.songs);
displayPlaylistsList(player.playlists);