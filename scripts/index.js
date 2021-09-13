/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
   let song = getElementById(songId).style.backgroundColor = "yellow";
      }
  


/**
* Creates a song DOM element based on a song object.
*/
function createSongElement({ id, title, album, artist, duration, coverArt }) {
   const song=arguments[0];
   const children = songsList(song);
   const classes = ["song"];
   const attrs = { onclick: playSong(id),cursor:"pointer",id:id };
   return document.createElement("div", children, classes, attrs);
}

/**
* Creates a playlist DOM element based on a playlist object.
*/
function createPlaylistElement({ id, name, songs }) {
   const playlist=arguments[0];
   const children = playPlaylist(playlist);
   const classes = ["playlist"];
   const attrs = {};
   return document.createElement("div", children, classes, attrs);
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
   const newElement= document.createElement(tagName);
   for(let i in classes){
      newElement.classList+=i;
   }
   const attr=Object.keys(attributes);
   for(let prop in attr.length){
       newElement.setAttribute(attr[prop],attributes[attr[prop]]); 
   }
   for(let child in children.length){
    newElement.textContent+=children[i];
}
   return newElement
}

// You can write more code below this line
function songsList(song){
   const listSongs=[]
   for(let i in song){
        if(i.toString()!=='duration' && i.toString()!=='coverArt'){
       const liTag=document.createElement('li');
       liTag.innerText=i+":"+ song[i]; 
       listSongs.push(liTag)
        }
        else if(i.toString()==="duration"){
         let liTag=document.createElement('li');
         let duration=mmsstDuriation(song[i]);
         liTag.innerText=i+":"+duration; 
         list.push(liTag)
     }
     else{
         const img=document.createElement('img')
         img.src=song[i]
         list.push(img)
     }
     }
     return list
   }



   function playPlaylist(playlist){
      const listPlaylists=[]
      const sumDuration =playlistDuration(playlist)
      for(let key in playlist){
          
          if(key.toString()!=="songs"){
             let liTag=document.createElement('li')
             liTag.innerText= key+" : "+playlist[key];
             listPlaylists.push(liTag)
                  }
          else{
              let liTag=document.createElement("li")
              liTag.innerText="number of songs: "+playlist.sosgs.length; 
             listPlaylists.push(liTag)
                  }
               }
        let liTag=document.createElement("li")
        liTag.innerText=duration+":"+sumDuration; `duration: ${sumDuration}`;
        list.push(sumDuration)
        return list 
            }

            const song=document.getElementById("songs");
            for(let i in player.songs){
               song.appendChild(createSongElement(player.songs[i]));
            }
            const playlist=document.getElementById("playlists");
            for(let i in player.playlists){
               playlist.appendChild(createPlaylistElement(player.playlists[i]))
            }