function convertDuration(duration) {
    //parameters - duration (type string('mm:ss') / number(seconds))
    //return string('mm:ss') if number was given
    //return number(seconds) if string was given
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

function generateID(arr, id){
    //parameters - arr (type array(of objects))
    //             id (type number)(optional)
    //if id is given - checks if it aviable id (if its not already used)
    //if id isnt given - generate new id
    //returns the id
  
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

function getEl(arr, id){
    //parameters - arr (type array(of objects))
    //             id (type number)
    //returns the object in the array that has the wanted id.
    for(let el of arr){
      if(el.id === id){
        return el;
      }
    }
    throw("couldn't find element where id=" + id);
  }

function newWindow(){
    let el = document.getElementById('main-content');
    while(el.firstChild){
        el.removeChild(el.firstChild);
    }
    
    el.appendChild(createElement("div",[],[],{'id':'songs' , 'class':'main-content'}))
    el.appendChild(createElement("div",[],[],{'id':'playlists', 'class':'main-content'}))
}

function removeSongHandler(){
    newWindow();

    let rad
    let songEl
    let form = createElement("form",[],['main-content'],{})
    for(let song of player.songs){
        songEl = createSongElement(song);
        rad = createElement("input",[songEl],[],{'type':'checkbox'})
        form.appendChild(rad);
    }
    document.getElementById("main-content").appendChild(form);
}

function addSongHandler(){
    newWindow();
    let children = []
    let text;
    let td, td1;

    let head = document.createElement("h1");
    head.textContent = "Add Song"
    
    text = document.createElement("text");
    text.textContent = "Song's name"
    td = createElement("td",[text])
    let title = createElement("input",[],[],{"type":"text", "name":"name", "placeholder":"Name", "required":"required"});
    td1 = createElement("td",[title])
    children.push(createElement("tr", [td,td1],[],{}))

    text = document.createElement("text");
    text.textContent = "Song's album"
    td = createElement("td",[text])
    let album = createElement("input",[],[],{"type":"text", "name":"album", "placeholder":"album", "required":"required"});
    td1 = createElement("td",[album])
    children.push(createElement("tr", [td,td1],[],{}))

    text = document.createElement("text");
    text.textContent = "Artist"
    td = createElement("td",[text])
    let Artist = createElement("input",[],[],{"type":"text", "name":"Artist", "placeholder":"Artist", "required":"required"});
    td1 = createElement("td",[Artist])
    children.push(createElement("tr", [td,td1],[],{}))

    text = document.createElement("text");
    text.textContent = "Duration"
    td = createElement("td",[text])
    let Duration = createElement("input",[],[],{"type":"text", "name":"Duration", "placeholder":"Duration", "required":"required"});
    td1 = createElement("td",[Duration])
    children.push(createElement("tr", [td,td1],[],{}))

    text = document.createElement("text");
    text.textContent = "ID (optional)"
    td = createElement("td",[text])
    let id = createElement("input", [],[],{"type":"text", "name":"id", "placeholder":"ID"})
    td1 = createElement("td",[id])
    children.push(createElement("tr", [td,td1],[],{}))
    

     // create a submit button
    let s = createElement("input",[],[],{"type":"submit", "value":"Add"/*, "onClick":"formSubmit()"*/})
    td = createElement("tr",[s])
    children.push(td);

    
    //form.setAttribute("action", "submit.php");
    let tr = createElement("tr",children)
    let table = createElement("table",[tr])
    let form = createElement("form",[head, table],["main-content"],{"onsubmit":"formSubmit()"})
    // Create a form synamically
    form.setAttribute("method", "post");
    // let d = createElement("div",[form],["main-content"])
    document.getElementById("main-content").appendChild(form)
}

function formSubmit(){
    console.log("WORK!!!!");
}

function addSong(title, album, artist, duration = "00:00", id) {
    //parameters - title (type string)
    //             album (type string)
    //             artist (type string)
    //             duration (type string)(format 'mm:ss')
    //             id(type number)(optional)
    //creates new song, add it to songs array.
    //return his id
    id = generateID(player.songs, id);
    duration = convertDuration(duration);
    //TODO: find a better way to generate the object
    let newSong={
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: duration,
    }
    player.songs.push(newSong);
    return id;
  }

//song on click.
//deletes everything and shows songs 
function songsHandler(){
    newWindow()
    for(const song of player.songs){
        document.getElementById("songs").appendChild(createSongElement(song))
    }
}

function playlistsHandler(){
    newWindow()
    for(const playlist of player.playlists){
        document.getElementById("playlists").appendChild(createPlaylistElement(playlist))
    }
}

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    const song = getEl(player.songs, songId);
    let currDir = document.getElementById("playNow")
    while(currDir.firstChild){
        currDir.removeChild(currDir.firstChild);
    }

    const plyNow = createElement("header");
    plyNow.textContent = "Playing Now";
    currDir.appendChild(plyNow);

    if(song.duration <= 120){
        currDir.style.background = "rgb(0,255,0)"
    }
    else if(song.duration >= 420){
        currDir.style.background = "rgb(255,0,0)"
    }
    else{
        const green = (420 - song.duration)*256/300
        const red = 256-green;
        currDir.style.background = "rgb(" + red +"," + green + ",0)"
    }
    currDir.appendChild(createSongElement(song))
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = ["song"]
    const attrs = { onclick: `playSong(${id})` }

    const topic = createElement("h1");
    topic.textContent = "song #" + id + "\n";
    children.push(topic)

    const info = createElement("p");
    info.textContent = "name: " + title + "\nalbum: " + album + "\nartist: " + artist + "\nduration: " + convertDuration(duration);
    children.push(info)

    const img = createElement("img");
    img.src = coverArt;
    children.push(img)

    //createElement('div',children,classes,attrs)
    //document.getElementById("songs").appendChild(createElement("div", children, classes, attrs));
    const el = createElement("div", children, classes, attrs)
    //console.log(el.attributes)
    return el
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = ["playlist"]
    const attrs = {}
    
    const topic = createElement("header");
    topic.textContent = "playlist #" + id + "  -  " + name;
    children.push(topic)

    const info = createElement("p");
    info.textContent = "songs -";
    children.push(info)
    for(let i = 1; i <= songs.length; i++){//pushes every song as an element
        children.push(createSongElement(getEl(player.songs,songs[i-1])));
    }

    //console.log(children);
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
    let newEl = document.createElement(tagName);
    for(const child of children){
        newEl.appendChild(child);
    }
    for(const cls of classes){
        newEl.classList.add(cls);
    }
    for(const atr in attributes){
        newEl.setAttribute(atr,attributes[atr])
    }
    return newEl
}

// You can write more code below this line
for(const song of player.songs){
    let el = createSongElement(song)
    document.getElementById("songs").appendChild(el);
    //console.log(el.attributes);
}
