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

/**
 * gets specific object in an array by id.
 * throws exception if not found.
 * @param {array} arr - songs array or playlist array to seek in.
 * @param {number} id - the wanted id of the object
 * @returns {object} - the object in the array that has the wanted id.
 */
function getEl(arr, id){
    for(let el of arr){
      if(el.id === id){
        return el;
      }
    }
    throw("couldn't find element where id=" + id);
}

/**
 * gets an array of objects and id(optional)
 * if id is given - checks if it aviable id (if its not already used)
 * if id isnt given - generate new id
 * @param {array} arr 
 * @param {number} id 
 * @returns {number} id
 */
function generateID(arr, id){
    let ids = [];//an array that includes all the ids of the objects in arr
    for(let cell of arr){
      ids.push(cell.id);
    }
  
    if(!id){//if id is undifined (optional!) => creates new one
      let i = 1;
      while(ids.includes(i)){
        i++;
      }
      id = i;
    }
    else{//if id has been given, checks if it already used.
      if(ids.includes(id)){
        throw(id + " id already exist!");
      }
    }
    return id;
}

/**
 * return string('mm:ss') if number was given
 * return number(seconds) if string was given
 * @param {string|number} duration (string('mm:ss') / number(seconds))
 * @returns {string|number} duration 
 */
function convertDuration(duration) {
    if(typeof(duration) === 'number'){
        let min  = Math.floor(duration / 60);
        let sec = duration % 60;
        if (min < 10) {
        min = "0" + String(min);
        }
        if (sec < 10) {
        sec = "0" + String(sec);
        }
        return min + ':' + sec;
    }
    else{//if its a string
        return parseInt(duration.slice(3)) + parseInt(duration.slice(0,2)) * 60;
    }
}

/**
 * creates new song, add it to songs array.
 * @param {string} title - song's title.
 * @param {string} album - song's album.
 * @param {string} artist - song's artist.
 * @param {string} duration - song's duration. patern - "MM:SS"
 * @param {number} id - optional. the id of the song. if not given, generates new one. (should be uniqe.)
 * @param {string} coverArt - path to image of the song.(local or from the network).
 * @returns {number} id - the id of the new object
 */
function addSong(title, album, artist, duration = "00:00", id, coverArt) {
    id = generateID(player.songs, id);
    duration = convertDuration(duration);
    let newSong={id, title, album, artist, duration, coverArt}
    player.songs.push(newSong);
    player.songs.sort((s1,s2) => s1.title.localeCompare(s2.title));
    return id;
}

/**
 * removes a song by the given id.
 * if the song doesn't exist - throws exception
 * @param {number} id
 */
function removeSong(id) {
    //parameters - id (type number)
    //removes the song with the wanted id(from songs array and from all the playlists)
    let song2delete = getEl(player.songs,id);
    const index = player.songs.indexOf(song2delete);
    player.songs.splice(index,1); //deletes the wanted song from the songs array.
  
    //searches and deletes the id of the song from all the playlists
    for(const pl of player.playlists){
        let songs = pl.songs;
        const i = songs.indexOf(id);
        if(i > -1){
            songs.splice(i,1);
        }
        if(songs.length === 0){
            removePlaylist(pl.id);
        }
    }
}

/**
 * removes a playlist by an id
 * @param {number} id 
 */
function removePlaylist(id) {
    //parameters - id(type number)
    //removes the playlist with the wanted id
    let pl = getEl(player.playlists, id);
    const index = player.playlists.indexOf(pl);
    player.playlists.splice(index,1);
  }
