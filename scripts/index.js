/**
 * removes all the elements from main content block
 */
function newWindow(){
    
    let el = document.getElementById('main-content');
    while(el.firstChild){
        el.removeChild(el.firstChild);
    }
    
    el.appendChild(createElement("div",[],[],{'id':'songs' , 'class':'main-content'}))
    el.appendChild(createElement("div",[],[],{'id':'playlists', 'class':'main-content'}))
}

/**
 * called when a remove button has been clicked.
 * removes the song, removes it from the playlists(if exists).
 * if the song is currently playing, stops it.
 * 
 * @param {number} id - the id of clicked song
 */
function removeSongHandler(id){
    removeSong(id);

    //if the song is currently playing:
    const playNowDiv = document.getElementById("playNow").children[1];
    if(playNowDiv){
        if(playNowDiv.id === "song" + id){
            document.getElementById("playNow").removeChild(playNowDiv);
        }
    }

    songsHandler();
}

/**
 * called when 'add song' clicked.
 * opens a form to add a song.
 */
function addSongHandler(){
    newWindow();
    let children = []
    let text;
    let keyInput;
    let td, td1;

    let head = createElement("h1");
    head.textContent = "Add Song"

    //the loop generates the form inside a table by the keys.
    const keys = ["name", "album", "artist", "duration", "image"]
    for(const key of keys){
        text = createElement("text");
        text.textContent = "Song's " + key;
        td = createElement("td",[text]);
        keyInput = createElement("input",[],[],{"id":key, "type":"text", "name":key, "placeholder":key, "required":"required"});
        td1 = createElement("td",[keyInput])
        children.push(createElement("tr", [td,td1],[],{}))
    }

    //generates the id as an optional input in the form
    text = createElement("text");
    text.textContent = "ID (optional)"
    td = createElement("td",[text])
    let id = createElement("input", [],[],{"type":"text", "id":"id", "placeholder":"ID"})
    td1 = createElement("td",[id])
    children.push(createElement("tr", [td,td1],[],{}))
    
    // create a submit button
    let s = createElement("input",[],[],{"type":"submit", "value":"Add", "onclick":"formSubmit()"})
    s.textContent = "Add"
    td = createElement("tr",[s])
    children.push(td);

    let table = createElement("table",children)
    let form = createElement("form",[head, table],["main-content"])
    // Create a form dynamically
    form.setAttribute("method", "post");
    document.getElementById("main-content").appendChild(form)
}

/**
 * called when add-song form is submited.
 * checks some of the values and cretes new song.
 */
function formSubmit(){
    const name = document.getElementById("name").value;
    const album = document.getElementById("album").value;
    const artist = document.getElementById("artist").value;
    const duration = document.getElementById("duration").value;
    const img = document.getElementById("image").value;
    const id = document.getElementById("id").value;

    if(!name || !album || !artist || !duration){
        addSongHandler();
        return;
    }

    if(duration.length != 5){
        alert("Unvalide Duration!")
        addSongHandler();
        return;
    }
    if((duration[0] < '0' || duration[0] > '9') || 
    (duration[1] < '0' || duration[1] > '9') || 
    (duration[3] < '0' || duration[3] >= '6') || 
    (duration[4] < '0' || duration[4] > '9') ||
    duration[2] != ":"){
        alert("Unvalide Duration!")
        addSongHandler();
        return;
    }

    addSong(name, album, artist, duration, id, img);

    songsHandler();
}

/**
 * @returns {array} songsElems - array of html elements that represents all the songs
 */
function getSongsElems(){
    let songsElems = [];
    for(const song of player.songs){
        const playButt = createElement("button",[],[],{onclick: `playSong(${song.id})`, "value":"Play"})
        playButt.textContent = "Play";

        const removeButt = createElement("button",[],[],{onclick: `removeSongHandler(${song.id})`, "value":"Remove"})
        removeButt.textContent= "Remove";

        const songDiv = createSongElement(song)

        songsElems.push(songDiv);
    }
    return songsElems;
}

/**
 * called when 'songs' button (nav-bar) clicked
 * resets the main content and shows the songs 
 */
function songsHandler(){
    newWindow();
    let songsElems = getSongsElems();
    // console.log(songsElems)
    for(const songEl of songsElems){
        // console.log(songEl.id)
        const id = parseInt(songEl.id.slice(4, songEl.id.length))
        // console.log(songEl.id + " - " + id + " - " + (songEl.id.length));
        const playButt = createElement("button",[],[],{onclick: `playSong(${id})`, "value":"Play"})
        playButt.textContent = "Play";

        const removeButt = createElement("button",[],[],{onclick: `removeSongHandler(${id})`, "value":"Remove"})
        removeButt.textContent= "Remove";

        let br = createElement("br");
        songEl.appendChild(br);
        songEl.appendChild(playButt);
        br = createElement("br");
        songEl.appendChild(br);
        songEl.appendChild(removeButt);
        document.getElementById("songs").appendChild(songEl)
    }
}

/**
 * called when 'playlists' button (nav-bar) clicked
 * resets the main content and shows the playLists 
 */
function playlistsHandler(){
    newWindow()
    for(const playlist of player.playlists){
        document.getElementById("playlists").appendChild(createPlaylistElement(playlist))
    }
}

function addSongToPlaylist(){
    newWindow();

}

/**
 * clears the playing-now div (at the bottom of the nav-bar)
 */
function clearPlayingNow(){
    let currDir = document.getElementById("playNow")
    while(currDir.firstChild){
        currDir.removeChild(currDir.firstChild);
    }

    const plyNow = createElement("header");
    plyNow.textContent = "Playing Now";
    currDir.appendChild(plyNow);
}

/**
 * Plays a song from the player.
 * Playing a song means showing the song in the 'playing now' section (at the bottom of the nav-bar)
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    clearPlayingNow()
    let song = getEl(player.songs, songId);
    let currDir = document.getElementById("playNow")
    
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

    const br = createElement("br")
    currDir.childNodes[1].appendChild(br);

    const stopButt = createElement("button",[],[],{onclick:"clearPlayingNow()"});
    stopButt.textContent = "Stop Playing";
    currDir.childNodes[1].appendChild(stopButt);
}

/**
 * Creates a song DOM element based on a song object.
 * @param {object} song - gets a song
 * @returns {HTMLElement} div - includes all the song's details
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = ["song"]
    const attrs = {"id":"song" + id}

    const topic = createElement("h1");
    topic.textContent = "song #" + id + "\n";
    children.push(topic)

    const info = createElement("p");
    info.textContent = "name: " + title + "\nalbum: " + album + "\nartist: " + artist + "\nduration: " + convertDuration(duration);
    children.push(info)

    if(coverArt){
        const img = createElement("img");
        img.src = coverArt;
        children.push(img)
    }

    const el = createElement("div", children, classes, attrs)
    return el
}

/**
 * Creates a playlist DOM element based on a playlist object.
 * @param {object} playlist
 * @returns {HTMLElement} div - a div that includes playlist's details and song
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
    for(let i = 1; i <= songs.length; i++){//pushes all the song in a playlist as an element
        children.push(createSongElement(getEl(player.songs,songs[i-1])));
    }

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
 * 
 * @returns {HTMLElement} newEl - the element that has been created
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
player.songs.sort((s1,s2) => s1.title.localeCompare(s2.title));
player.playlists.sort((pl1,pl2) => pl1.name.localeCompare(pl2.name));
songsHandler()
