/*
import{
    songId,
    tagName,
    children,
    classes,
    attributes,
    createSongElement,
    createPlaylistElement,
    createElement,
    player
} from '/.index'
import { player } from '/.player';
*/

//Get existing elements in the html index and place them in variables
let body = document.getElementById('body');
let songsElement = document.getElementById('songs');
let playlistsElement = document.getElementById("playlists"); 

//-----------Create essential elements------\\

//---------MAIN--------\\
//Container element (<div>) for main
//Create element
let mainContainer = document.createElement('div');
//Add class
mainContainer.className = "container";
//Add ID 
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


//console.log(body);
//console.log(mainContainer);
//console.log(mainH1);
//console.log(intro);
//console.log(songsElement);
//console.log(songsHeader);
//console.log(playlistsElement);
//console.log(playlistsHeader);
//console.log(songsH2);
//console.log(playlistsH3);

