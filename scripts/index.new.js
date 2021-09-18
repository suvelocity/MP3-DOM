/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
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
        content:calculateDuration(songPlayed.duration),
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
    r.addEventListener('click', function (){
        while (document.getElementById("main").firstChild) {
            document.getElementById("main").removeChild(document.getElementById("main").lastChild);
        }
        let heading = document.createElement('h1');
        heading.textContent = 'MP3';
        
        document.getElementById("main").appendChild(heading);

    });
    
    document.getElementById("main").appendChild(r);
    console.log(songPlayed);
    
    window.setTimeout(function ()  {
        let index, i = 0
        player.songs.forEach(song => {
            if(song.id == songId)
                index = i;
            i++;
        });
        if(index != player.songs.length -1)
            playSong(player.songs[index + 1].id);
        else
            playSong(player.songs[0].id);
    
    }, songPlayed.duration * 1000);

}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    let index = 0;
    let i = 0;
    player.songs.forEach(song => {
        if(song.id == songId)   
            index = i;
        i++;
    });
    player.songs.splice(index,1);
    i = 0;
    player.playlists.forEach(playlist => {
        i = 0;
        playlist.songs.forEach(song => {
            if(song == songId)
                playlist.songs.splice(i, 1);
            i++;
        });
        
    });
    while (document.getElementById("songs").firstChild) {
        document.getElementById("songs").removeChild(document.getElementById("songs").lastChild);
    }
    
    while (document.getElementById("playlists").firstChild) {
        document.getElementById("playlists").removeChild(document.getElementById("playlists").lastChild);
    }
    while (document.getElementById("main").firstChild) {
        document.getElementById("main").removeChild(document.getElementById("main").lastChild);
    }
    let heading = document.createElement('h1');
    heading.textContent = 'MP3';
    
    document.getElementById("main").appendChild(heading);
    
    generateSongs();
    generatePlaylists();
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    let t = duration.split(":");
    let minutes = t[0]*60;
    let seconds = t[1]*1
    let durationInSec = minutes + seconds;
    console.log(durationInSec);
    let newSong = {
        id:genrateSongID(),
        title:title,
        album:album,
        artist:artist,
        duration:durationInSec,
        coverArt:coverArt
    };
    player.songs.push(newSong);
    createSongElement(newSong);
    
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    element = event.target;
    if(event.target.id.includes('play')){
        
        playSong(event.target.id[0]);
    }
    if(event.target.id.includes('remove')){
        removeSong(event.target.id[0]);
    }
    
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    let arr = document.getElementsByTagName('INPUT');
    
    addSong({
        title:arr[0].value,
        album:arr[1].value,
        artist:arr[2].value,
        duration:arr[3].value,
        coverArt:arr[4].value
    });
}

/**
 * Creates a song DOM element based on a song object.
 */
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
        content:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Android_Emoji_25b6.svg",
        type:'button',
        event:'play',
        id:id
    },{
        content:"https://upload.wikimedia.org/wikipedia/commons/4/4c/OOjs_UI_icon_trash_apex.svg",
        type:'button',
        event:'remove',
        id:id
    },{
        content:coverArt,
        type:'img'
    }]

    const classes = ['card', 'song']; 
    let TDuration = duration;
    let numRed, numGreen, rootNum = 255,precentage, minDuration, calculate = true;
    TDuration = TDuration - 120;
    if(duration < 120){
        numGreen = rootNum;
        numRed = 0;
        calculate = false;
    }
    if(duration > 420){
        numRed = rootNum;
        numGreen = 0;
        calculate = false;
    }
    if(calculate){
        precentage = TDuration / 300;
        numRed = rootNum * precentage;
        numGreen = rootNum *(1-precentage);
    }    
    
    const attrs = {style:`background-color:rgb(${(numRed)},${numGreen},0)`};
    const eventListeners = {click: handleSongClickEvent};
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
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
    }];
    const classes = ['card', 'playlist'];
    const attrs = {};
    const eventListeners = {};
    return createElement("div", children, classes, attrs, eventListeners);
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
    let r = document.createElement(tagName);
    children.forEach(child => {
        t = document.createElement(child.type);
        if(child.type == 'img'){
            t.setAttribute("src", child.content);

            t.setAttribute("width", "100%");

            t.setAttribute("height", "100%");


        }else if(child.type.includes('button')){
            t.style.background=`url(${child.content}) no-repeat`;   
            t.style.width = '25px';
            t.style.height = '25px';
            
            t.id = child.id;
            t.id += child.event;

            t.addEventListener('click', eventListeners['click']);
            
        }else{
            t.textContent = child.content;
        }
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
// a function that gets a playlist's id and returns the playlist total duration.
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
//a function that gets a playlist id and a song id and return their indexes
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
//genrate a new unique id
function genrateSongID(){
    id = 1;
    player.songs.forEach(song => {
      player.songs.forEach(s => {
        if(song.id == id)
          id++;
      });
    });
    return id;
  }
/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    songs = player.songs;
    songs.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
    })
    songs.forEach(song => {
        createSongElement(song);
    });
}   

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    playlists = player.playlists;
    playlists.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    playlists.forEach(playlist => {
        createPlaylistElement(playlist);
    });
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
