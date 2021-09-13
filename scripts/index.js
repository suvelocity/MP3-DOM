const convertDuration = (duration) => {

    let min = String(Math.floor(duration / 60));
    let sec = String(duration % 60);
  
    min < 10 ? (min = '0' + String(min)) : min
    sec < 10 ? (sec = '0' + String(sec)) : sec
  
    return min + ':' + sec

  }

function playSong(songId) {
    const selectedSong = document.getElementById(songId);
    const classes = []
    classes.push(["selected"])

    const songs = document.getElementsByClassName("song");
    for (let song of songs) {
        song.classList.remove(classes)
    }
    selectedSong.classList.add(classes);
}


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    
    const children = []
    const wrap = document.createElement("div");
    const titlePlayList = document.createElement("h1");
    titlePlayList.append("PlayLists");
    for (let i = 0; i < 5; i++)
    {
        if (arguments[i] === arguments[4])
        {
            arguments[i] = convertDuration(arguments[4]);
        }
        let list = document.createElement("li"); 
        list.innerText = arguments[i]
        wrap.append(list);
    }
    let currentImg= document.createElement("img");
    currentImg.src= arguments[5];
    wrap.appendChild(currentImg);
   
    children.push(wrap)
    const classes = []
    classes.push(["song"]) // CSS later
    const attrs = { onclick: `playSong(${arguments[0]})`,}
    return createElement("div", children, classes, attrs, arguments[0])
}


function createPlaylistElement({ id, name, songs }) {
    const children = [];
    const wrapper = document.createElement("div");
    for(let arrgIndex = 0; arrgIndex < 3; arrgIndex++){

       let par =  arguments[arrgIndex] === arguments[1] ? document.createElement("h1") : document.createElement("p");
        par.innerHTML = arguments[arrgIndex];
        wrapper.appendChild(par);
    }
    children.push(wrapper);
    const classes = [];
   
    classes.push(["playlist"])
    const attrs = {}
    return createElement("div", children, classes, attrs, id)

}


function createElement(tagName, children = [], classes = [], attributes = {}, id) {
    const element = document.createElement(tagName);
    for (let child of children)
    {
        element.appendChild(child);
    }
    element.classList.add(classes);
    Object.entries(attributes).forEach(([key,value]) => {
        if (key !== undefined) {
            element.setAttribute(key, value);
        }
    })

    element.id = id;
    return element;
}
