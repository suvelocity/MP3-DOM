// converting duration 
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
        
    setInterval(function(){ song.classList.remove(classes); }, 3000); 
    }
    selectedSong.classList.add(classes);
}



//  gives platlist duration 
function playlistDuration(id) {
    const foundPlaylist = player.playlists.find(currPlaylist => currPlaylist.id === id);
  
    // Reduce function to sum all the song durations, by finding each of them, and then adding to the sum
    return foundPlaylist.songs.reduce((sum, currSong) => 
              sum + player.songs.find(song => song.id === currSong).duration, 0);
  }


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const artistEl = createElement("span", [artist]);
    const durationEl = createElement("span", ["" + convertDuration(duration)] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
    return createElement("div", ["Artist: ", artistEl, "Duration: ", durationEl, imgEl]);
  }


function createPlaylistElement({id,name, songs = []} ) {
    const children = [];
    const classes = [];
    const attrs = {};
    const idEl = createElement("span", ["" + id] ,["id"]);
    const playListName = createElement("h1",[name]);
    const PLsongs = createElement("p",[songs]);
    const durationEl = createElement("span", ["" + convertDuration(playlistDuration(id))] ,["duration", "short-duration"]);
    classes.push("playlist")
    children.push(idEl,"Play list Name: ",playListName,"Songs: ", PLsongs," Duration: ", durationEl);
    
    return createElement("div", children, classes, attrs)
    // for(let arrgIndex = 0; arrgIndex < 3; arrgIndex++){

    //    let par =  arguments[arrgIndex] === arguments[1] ? document.createElement("h1") : document.createElement("p");
    //     par.innerHTML = arguments[arrgIndex];
    //     wrapper.appendChild(par);
    // }
    // children.push(wrapper);
    // const classes = [];
   
    // classes.push(["playlist"])
    // const attrs = {}
    // return createElement("div", children, classes, attrs, id);

}


function createElement(tagName, children = [], classes = [], attributes = {}) {
    const el = document.createElement(tagName);
      
    // Children
    for(const child of children) {
      el.append(child);
    }
  
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
  
    return el;
  }
// sorting songs
const sortBySong = () => {
    player.songs.sort((a, b) => (a.title > b.title) * 2 - 1);
}
// sorting platlists 
const sortByPlayList = () => {
    player.playlists.sort((a, b) => (a.title > b.title) * 2 - 1);
}
// printing all songs 
const printAllSongs = () => {
    const songPrint = document.getElementById("songs");

    for(let song of player.songs){
        const { id,title, album, artist,duration,coverArt} = song;
        const songElemnt = createSongElement({id, title, album, artist, duration, coverArt});
        songPrint.appendChild(songElemnt);
    }
}
// printing all plalysts 
const printAllPlaylists = () => {
    const playlistPrint = document.getElementById("playlists");

    for (let playlist of player.playlists) {
        const {id, name,songs} = playlist;
        const playlistElem = createPlaylistElement({id, name, songs});
        playlistPrint.append(playlistElem);
    }
}
// calling functions 
sortBySong();
printAllSongs();
printAllPlaylists();


// function createPlaylistElement({ id, name, songs }) {
//     const children = []
//     const classes = []
//     const attrs = {}

//     // children
//     const idEl = createElement("span", ["" + id] ,["id"]);
//     const nameEl = createElement("span", ["" + name] );
//     const songsEl = createElement("span", ["" + songs] ,["songs"]);
//     const durationEl = createElement("span", ["" + durationConvert(playlistDuration(id))] ,["duration", "short-duration"]);

//     // push childrens and classes
//     children.push("Id: ",idEl, " name: ", nameEl, " The playlist songs: ",songsEl," Duration: ", durationEl);
//     classes.push("playlist")

//     return createElement("div", children, classes, attrs)
// }