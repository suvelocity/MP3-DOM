const player = {
    songs: [
        {
            id: 1,
            title: "Vortex",
            album: "Wallflowers",
            artist: "Jinjer",
            duration: 242,
            coverArt: "./images/cover_art/jinjer_vortex.jpg",
        },
        {
            id: 2,
            title: "Vinda",
            album: "Godtfolk",
            artist: "Songleikr",
            duration: 160,
            coverArt: "./images/cover_art/songleikr_vinda.jpg",
        },
        {
            id: 7,
            title: "Shiroyama",
            album: "The Last Stand",
            artist: "Sabaton",
            duration: 213,
            coverArt: "./images/cover_art/sabaton_shiroyama.jpg",
        },
        {
            id: 3,
            title: "Thunderstruck",
            album: "The Razors Edge",
            artist: "AC/DC",
            duration: 292,
            coverArt: "./images/cover_art/acdc_thunderstruck.jpg",
        },
        {
            id: 4,
            title: "All is One",
            album: "All is One",
            artist: "Orphaned Land",
            duration: 270,
            coverArt: "./images/cover_art/orphaned_land_all_is_one.jpg",
        },
        {
            id: 5,
            title: "As a Stone",
            album: "Show Us What You Got",
            artist: "Full Trunk",
            duration: 259,
            coverArt: "./images/cover_art/full_trunk_as_a_stone.jpg",
        },
        {
            id: 6,
            title: "Sons of Winter and Stars",
            album: "Time I",
            artist: "Wintersun",
            duration: 811,
            coverArt: "./images/cover_art/wintersun_sons_of_winter_and_stars.jpg",
        },
    ],
    playlists: [
        { id: 1, name: "Metal", songs: [1, 7, 4, 6] },
        { id: 5, name: "Israeli", songs: [4, 5] },
    ],
}
function durationConvertor (duration) // convert duration format from seconds to MM:SS format
{
  let min="";
  let sec="";
  if (typeof(duration) !== "number")
  {
    throw "Please Enter a number"
  }
  min = Math.floor(duration/60);
  sec = duration%60;
  
  if (min < 10 && sec < 10)  //making sure the time format get out correctly
  {
  return("0"+min+":"+"0"+sec)
  }
  else if (min < 10 && sec > 10)
  {
    return("0"+min+":"+sec)
  }
  else if (min > 10 && sec < 10)
  {
    return(min+":"+"0"+sec)
  }
  else {
    return(min+":"+sec) 
  }
}

function sortedSongs () {
    player.songs.sort((a, b) => (a.title > b.title) * 2 - 1)
}

function sortedPlaylists () {
    player.playlists.sort((a, b) => (a.title > b.title) * 2 - 1)
}

function printAllSongs()
{
    const songPrint = document.getElementById("songs");

    for(let song of player.songs)
    {
        const { id: id,
                title: title,
                album, artist,
                duration: duration,
                coverArt: coverArt} = song;
        const songElem = createSongElement(id, title, album, artist, duration, coverArt);
        console.log(id);

        songPrint.appendChild(songElem);
    }
}
function printAllPlaylists()
{
    const playlistPrint = document.getElementById("playlists")

    for(let playlist of player.playlists)
    {
        const {id: id,
               name: name,
               songs: songs} = playlist;
        const playlistElem = createPlaylistElement(id, name, songs);
        playlistPrint.appendChild(playlistElem);
    }
}
 