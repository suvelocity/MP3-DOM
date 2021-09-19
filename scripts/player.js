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
      //External Functions
      function secondsToMinutesConvertor(songDuration){
        if(typeof(songDuration) === 'number'){
          let min  = Math.floor(songDuration / 60);
          let sec = songDuration % 60;
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          return min.toString() + ':' + sec.toString();
        }
        else{
          return parseInt(songDuration.slice(3)) + parseInt(songDuration.slice(0,2)) * 60;
        } 
      }
  
      function getPlaylistById(id){
        let playlistId = player.playlists.filter(playlist =>{
          if(playlist.id === id){
            return playlist;
          }
        })
        return playlistId[0];
      }
      
      function playlistDuration(id) {
        let WantedPlaylist = getPlaylistById(id);
        let songsArray = WantedPlaylist.songs.map(song => {
          return getSongObjectById(song).duration})
          let totalDuration = (songsArray.reduce((added, currentValue) => {
            currentValue += added;
            return currentValue;
          }))
          return secondsToMinutesConvertor(totalDuration);
        }
  
        function generateId(idArr,id){
          let newArr=[];
          for(let i of arr){
            newArr.push(i.id);
          }
        } 
  
        function getSongObjectById(id){
          let song = player.songs.filter(songObject => {
            if(songObject.id == id){
              return songObject;
            }
          })
          if(song.length == undefined){
            throw new Error ("id is undefined");
          }
          song = song[0];
          return song;
        } 
  
        function convertToseconds(mmssDuration){
          let minutes = Number(mmssDuration.split("").slice(0, 2).join(""));
          let seconds = Number(mmssDuration.split("").slice(3, 5).join(""));
          let time = (minutes * 60) + seconds;
          return time;
        }