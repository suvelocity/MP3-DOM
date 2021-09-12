/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
 for (let song of player.songs){
     document.getElementById(song.id).style.background="white"
     if(song.id===songId){
        document.getElementById(song.id).style.background="lightblue"
     }
 }
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const song=arguments[0]
    const children = songList(song)
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})`,cursor:"pointer",id:id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const playlist=arguments[0]
    const children = playPlaylist(playlist)
    const classes = ["playlist"]
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
function createElement(tagName, children = [], classes = [], attributes = {}) {
    let element= document.createElement(tagName)
   classes.forEach(c =>element.classList.add(c))
   const attribute=Object.keys(attributes)
   for(let i=0;i<attribute.length;i++){
       element.setAttribute(attribute[i],attributes[attribute[i]])  
   }
   for(let i=0;i<children.length;i++){
    element.append(children[i])
   }
    return  element
}
// You can write more code below this line

function songList(song){
const list=[]
for(let key in song){
     if(key.toString()!=='coverArt' && key.toString()!=='duration'){
    const li=document.createElement('li');
    li.innerText=`${key}: ${song[key]}`;
    list.push(li)
}
 else if(key.toString()==="duration"){
    const li=document.createElement('li');
    let duration=convertDuriation(song[key])
    duration.toString
    li.innerText=`${key}: ${duration}`;
    list.push(li)
}
else{
    const img=document.createElement('img')
    img.src=song[key]
    list.push(img)
}
}
return list
}

function playPlaylist(playlist){
    const list=[]
    let sumDuration =playlistDuration(playlist)
    for(let key in playlist){
        if(key.toString()!=="songs"){
           const li=document.createElement('li')
               li.innerText=`${key}: ${playlist[key]}`;
                  list.push(li)
                }
                else{
                    const li=document.createElement("li")
                    li.innerText=`number of songs: ${playlist.songs.length}`
                    list.push(li)
      
                }
    }
    const li=document.createElement("li")
    sumDuration=convertDuriation(sumDuration)
    li.innerText=`duration: ${(sumDuration)}`;
    list.push(li)
    return list 
    }




    player.songs.sort(sortArray);
const x=document.getElementById("songs")
for(let i=0;i<player.songs.length;i++){
x.appendChild(createSongElement(player.songs[i]))
}

const y=document.getElementById("playlists")
for(let i=0;i<player.playlists.length;i++){
    y.appendChild(createPlaylistElement(player.playlists[i]))
    }

    function sortArray(a, b){
        if(a.hasOwnProperty("title")){
          return a.title.localeCompare(b.title);
        }
        if(a.hasOwnProperty("name")){
          return a.name.localeCompare(b.name);
        }
    }