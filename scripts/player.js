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


//generate new id that doesnt exit in player.songs
function randomID(array){
    let newId=array[0].id
    for(let i=0;i<array.length;i++){
      if(exist(newId,array)!==-1){
        newId++
      }
    }
    return newId
  }

//takes a durtaion as number and conver it to (mm:ss) format
function convertDuriation(duration){
    let seconds=duration
    let minutes=Math.floor(seconds/60)
     if(seconds-(minutes*60)<10) return "0"+minutes+":"+"0"+(seconds-(minutes*60))
     else if(minutes>10){  return minutes+":"+(seconds-(minutes*60))
    }
    else return "0"+minutes+":"+(seconds-(minutes*60))
   }

//    for(let i=0;i<player.songs.length;i++){
//     player.songs[i].duration=convertDuriation(player.songs[i].duration)
//    }
  

   function sumPlaylist(playlist){
       let sumDuration=0
       for(let i=0;i<playlist.songs.length;i++){
           for(let j=0;j<player.songs.length;j++){
               if (player.songs[j]==playlist.songs[i]){
                   sumDuration+=player.songs[j].duration
               }
         }
       }
       return sumDuration
   }

   function exist(id,array){
    for (let i=0; i<array.length;i++){
       if(array[i].id==id) return i;
    }
    return -1
     }

     function songFromArray(id){
        return player.songs[exist(id,player.songs)].duration
        }
   
        function playlistDuration(playlist) {
            let sumDuration=0
            for (let j=0;j<player.playlists.length;j++){
                if(player.playlists[j].name===playlist.name){
                    for(let i=0;i<player.playlists[j].songs.length;i++){
                        sumDuration+=songFromArray(player.playlists[j].songs[i])
                      }
                      return sumDuration;
                }
            }
            }
        