// sleep function
const DEF_DELAY = 1000;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

// get data from url
async function getData(url){
    const curRequest = new Request(url);
    return fetch(curRequest)
        .then((response)=>response.text())
        .then((text) => {
            return text
        });
}

// set the main page content to the selected page
const content=document.getElementById("content")
async function setContent(name) {
    console.log(`started loading ${name}`);
    // const myRequest = new Request(`pages/${name}.html`);
    // fetch(myRequest)
    // .then((response) => response.text())
    // .then((text) => {
    //     content.innerHTML = text;
    // });
    content.innerHTML=await getData(`pages/${name}.html`);
    console.log(`finished loading ${name}`);
    curContent=name;
}

// calculate height
var body = document.body,
    html = document.documentElement;
const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
const width  = Math.max( body.scrollWidth,  body.offsetWidth,  html.clientWidth,  html.scrollWidth,  html.offsetWidth );

const header=document.getElementById("header");
const transitionElement=document.getElementById("transition");
var running=false
var curContent="home";
// function to play transition and switch content
async function changeContent(name){
    console.log("");
    console.log(`animation starting for ${name}`);

    if (running){
        console.log("animation cancelled: animation already running");
        console.log("");
        return;
    }

    if (name===curContent){
        console.log("animation cancelled: already on page");
        console.log("");
        return;
    }

    running=true;

    document.getElementById(`${name}Nav`).classList.add("activeLink");
    document.getElementById(`${curContent}Nav`).classList.remove("activeLink");

    // set transition size to what is required
    transitionElement.style.width=width+"px";
    transitionElement.style.height=Math.max((height-header.offsetHeight),content.offsetHeight+header.offsetHeight)+"px";
    transitionElement.style.top=header.offsetHeight+"px";

    // play intro animation
    content.classList.add("closed");
    transitionElement.classList.remove("before");
    transitionElement.classList.add("during");
    await sleep(250);

    // set content
    await setContent(name);
    // play outro animation
    transitionElement.classList.remove("during");
    transitionElement.classList.add("after");
    content.classList.remove("closed");
    await sleep(250);

    // reset to start position
    transitionElement.classList.add("notransition");
    transitionElement.offsetHeight; // update css
    await sleep(10);
    transitionElement.classList.remove("after");
    transitionElement.classList.add("before");
    transitionElement.offsetHeight; // update css
    transitionElement.classList.remove("notransition");

    running=false;
    console.log(`animation finished for ${name}`)
}

window.addEventListener('offline', () => {
    console.log('Offline');
    alert("Notice: Website will not work offline");
});
window.addEventListener('online', () => {
    console.log('Online');
    // alert("Back online");
});

// function to toggle dark mode on and off
var darkMode=false;
function toggleDarkmode(){
    darkMode=!darkMode;
    console.log(`Dark mode is on: ${darkMode}`);
    if (darkMode){
        document.querySelectorAll("*").forEach((element)=>{
            element.classList.add("darkmode");
        });
    } else {
        document.querySelectorAll("*").forEach((element)=>{
            element.classList.remove("darkmode");
        });
    }
}

// toggle all transitions on and off
var transitionsOn = true;
function toggleTransitions(){
    transitionsOn=!transitionsOn;
    console.log(`Transitions are on: ${transitionsOn}`);
    if (transitionsOn){
        document.querySelectorAll("*").forEach((element)=>{
            element.classList.remove("notransition");
            element.offsetHeight; // update css
        });
    } else {
        document.querySelectorAll("*").forEach((element)=>{
            element.classList.add("notransition");
            element.offsetHeight; // update css
        });
    }
}

window.addEventListener("load", async (event) => {
    console.log("DOCUMENT LOADED");
    toggleTransitions(); // turn off transitions
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("darkmode detected");
        toggleDarkmode(); // turn on dark mode
    }
    await setContent("home"); // set content to home
    toggleTransitions(); // turn back on transitions
    console.log("FINISHED LOADING");
    console.log("");
});