/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    let song = getElementById(songId);
    song.style.backgroundColor = "dark grey";
}

/**
 * Creates a song DOM element based on a song object.
 */

/*          First try
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    
    -------Song elements-------\\
     const songTitle = document.createElement("header");
     songTitle.innerHTML = title;
     songTitle.className = "song-title";
    
     const songAlbum = document.createElement("li");
     songAlbum.innerHTML = album;
     songAlbum.className = "song-item";

     const songArtist = document.createElement("li");
     songArtist.innerHTML = artist;
     songArtist.className = "song-item"; 

     const songDuration = document.createElement("li");
     songDuration.innerHTML = durationConvertor(duration);
     songDuration.className = "song-duration";

     const songCover = document.createElement("img");
     songCover.innerHTML = coverArt;
     songCover.className = "song-cover";


     const children = [songTitle, songAlbum, songArtist, songDuration, songCover];
     const classes = ["song-class"];
     const attrs = { onclick: `playSong(${id})` }

     return createElement("div", children, classes, attrs)
};
*/

//          Second try
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    // Song title (<header>)
    const titleEl = createElement("header", [title], ["title-class"]);
    // Song album (<li>)
    const albumEl = createElement("li", ["From: ", album], ["item-class"]);
    // Song artist (<li>)
    const artistEl = createElement("li", ["By: ", artist], ["item-class"]);
    // Song duration (<li>)
    const durationEl = createElement("li", ["Duration: ", durationConvertor(duration)], ["duration-class"], {onclick: `console.log('${duration}')`});
  
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["image-class"], {src: coverImageArtUrl});
  
    return createElement("div", [titleEl, artistEl, albumEl, durationEl, imgEl]);
  }

/**
 * Creates a playlist DOM element based on a playlist object.
 */


function createPlaylistElement({ id, name, songs }) {
    const children = [];
    const classes = [];
    const attrs = {};
    return createElement("div", children, classes, attrs);
};


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

/*            First try
function createElement(tagName, children = [], classes = [], attributes = {}) {
     let element = document.createElement(tagName);
     for(let child of children){
         element.appendChild(child);
     }
     for(let clas of classes){
         element.className = clas;
     }

     //coudln't figure this out
    
     for(let attri in attributes){
     element.setAttribute(attri, attributes[attri]);
     }
     return element;
};
*/

//            Second try
function createElement(tagName, children = [], classes = [], attributes = {}) {
    //Create element
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


// You can write more code below this line

//Duration convertor (from seconds to mm:ss)
function durationConvertor(duration){
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    if (seconds < 10){
      seconds = "0" + seconds;
    }
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }


//Get existing elements in the html index and place them in variables
let body = document.getElementById('body');
let songsElement = document.getElementById('songs');
let playlistsElement = document.getElementById("playlists"); 

//-----------Create essential elements------\\

//---------MAIN--------\\
//Container element (<div>) for main
//Create element
let mainContainer = document.createElement('div');

mainContainer.id = "main-container";

    //Header element (<header>) for main
    let mainHeader = document.createElement('header');
    mainHeader.id = "main-header";

        //Headline element (<h1>) for main
        let mainH1 = document.createElement('h1');
        mainH1.id = "main-headline";

    //Intro element (<p>) for main
    let intro = document.createElement('p');
    intro.className = "paragraph";
    intro.id = "intro";    


//---------SONGS--------\\
//Container element (<div>) for songs
songsElement.className = "container";

    //Header element (<header>) for songs
    let songsHeader = document.createElement('header');
    songsHeader.className = "sub-header";
    songsHeader.id = "songs-header";
    
        //Headline element (<h2>) for songs
        let songsH2 = document.createElement('h2');
        songsH2.className = "sub-headline";
        songsH2.id = "songs-headline";
        
    //List element (<ul>) for songs
    let listOfSongs = document.createElement('ul');
    listOfSongs.className = "list";
    listOfSongs.id = "songs-list";
    console.log(listOfSongs)

        //Item for each song
        

//-------PLAYLISTS-------\\
//Container element (<div>) for playlists
playlistsElement.className = "container";

    //Header element (<header>) for playlists
    let playlistsHeader = document.createElement('header');
    playlistsHeader.className = "sub-header";
    playlistsHeader.id = "playlists-header";
    
        //Headline element (<h3>) for playlists
        let playlistsH3 = document.createElement('h3');
        playlistsH3.className = "sub-headline";
        playlistsH3.id = "playlists-headline";

    //List element (<ul>) for playlists
    let listOfPlaylists = document.createElement('ul');
    listOfPlaylists.className = "list";
    listOfPlaylists.id = "playlists-list";

        //Item for each playlist
        

//-----------Appendment and placement of elements------\\
//---------MAIN--------\\
body.appendChild(mainContainer);
body.insertBefore(mainContainer, songsElement);
    mainContainer.appendChild(mainHeader);
        mainHeader.appendChild(mainH1);

    mainContainer.appendChild(intro);
    mainContainer.insertBefore(mainHeader, intro);
    mainHeader.insertBefore(mainH1, mainHeader.lastChild);

//---------SONGS--------\\
songsElement.appendChild(songsHeader);
    songsHeader.appendChild(songsH2);

songsElement.appendChild(listOfSongs);
for(let song of player.songs){
    listOfSongs.appendChild(createSongElement(song));
}
    //listOfSongs.appendChild(newSong);
    //listOfSongs.insertBefore(newSong, listOfSongs.lastChild);

//-------PLAYLISTS-------\\

playlistsElement.appendChild(playlistsHeader);
    playlistsHeader.appendChild(playlistsH3);

playlistsElement.appendChild(listOfPlaylists);

//-----------Content of elements------\\
//---------MAIN--------\\
//Main headline
mainH1.innerHTML = "Aviv's MP3 Player";
mainH1.style.color = "black";

//Intro paragraph
intro.innerHTML = "This MP3 player was created to light up your mood, do not hesitate to use it :)"

//---------SONGS--------\\
//Songs headline
songsH2.innerHTML = "Songs";




//-------PLAYLISTS-------\\
//playlists headline
playlistsH3.innerHTML = "Playlists";

