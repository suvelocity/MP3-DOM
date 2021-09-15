// converting duration 
const convertDuration = (duration) => {

  const minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  
  return `${minutes}:${seconds}`;
  }

  let timerInterval = null;

  document.getElementsByClassName("duration").innerHTML = `...`;
 
  
  // function startTimer() {
  //   timerInterval = setInterval(() => {
  //     timePassed = timePassed += 1;
  //     timeLeft = TIME_LIMIT - timePassed;
  //     document.getElementById("short-duration").innerHTML = formatTime(timeLeft);
  //   }, 1000);
  // }
    
  
 

    let runLoop;
    

     function playSong(id,newDuration) {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("short-duration").innerHTML = formatTime(timeLeft);
      }, 1000)
      const TIME_LIMIT = newDuration;
      let timePassed = 0;
      let timeLeft = TIME_LIMIT;
      if(id === 8){          //need to be set as length of all ids
        id = 1;
      }
    
      document.getElementById(id).style.backgroundColor = "green"; 
      if(document.getElementById(id).style.backgroundColor = "green"){
        document.getElementsByClassName('duration').style.color = "red";
      }
      runLoop = setTimeout(function(){document.getElementById(id).style.backgroundColor = "white" }, 3000); 

      
      let time = setTimeout(function(){playSong(id+1) }, 3000);
     

    
        ///needs to set as duration song
       
       }
   

//  gives platlist duration 
function playlistDuration(id) {
    const foundPlaylist = player.playlists.find(currPlaylist => currPlaylist.id === id);
  
    // Reduce function to sum all the song durations, by finding each of them, and then adding to the sum
    return foundPlaylist.songs.reduce((sum, currSong) => 
              sum + player.songs.find(song => song.id === currSong).duration, 0);
  }

function createSongElement({ id,artist,duration, coverArt }) {
  const  colored = (duration) => {
    return duration < 600 ? 'color:green':'color:red';
  } 
    const classes = [];
    const getId = createElement('p',[id]);
    const artistEl = createElement("p", [artist]);
    let newDuration = convertDuration(duration)
    const durationEl = createElement("p", [ newDuration] ,["duration", "short-duration"],{style:colored(duration)}, {onclick: `console.log('${duration}')`});
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
    const attrs = { onclick: `playSong(${id})`,id,class:`songs`}
    classes.push("songs");
    return createElement("div",[getId,"Artist: ", artistEl, "Duration: ", durationEl, imgEl],[],attrs);
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
    
    return createElement( "div",children, classes, attrs,id);
    

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
const printAllSongs = (id) => {
    const songPrint = document.getElementById("songs");

    for(let song of player.songs){
        const { title, album, artist,duration = duration,id,coverArt} = song;
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
