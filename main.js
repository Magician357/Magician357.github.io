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

    if (!isonline){
        console.log("loading failed: not online");
        alert("Loading has failed. Please check your internet connection");
        location.reload(); // refresh page to make sure it doesnt break
        return;
    }

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
var funny_counter=0;
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
        funny_counter++;
        console.log("animation cancelled: already on page");
        console.log(`button has been pressed ${funny_counter} times`);
        if (funny_counter>20&&funny_counter<50) {
            if (Math.random()>0.5){
                alert(`please stop you have pressed it ${funny_counter} times already`);
            }
        }

        if (funny_counter===20){
            alert("you're already on this page stop pressing the button");
        }

        if (funny_counter>=50) {
            alert("thats it");
            changeContent("secret");
            document.getElementById(`${curContent}Nav`).remove();
            document.getElementById("secretNav").style.display="block";
        }
        return;
    }
    funny_counter=0;

    if (!isonline){
        console.log("animation cancelled: not online");
        alert("The page cannot load because you are offline.");
        console.log("");
        return;
    }

    running=true;
    const start= Date.now();

    document.getElementById(`${name}Nav`).classList.add("activeLink");
    document.getElementById(`${curContent}Nav`).classList.remove("activeLink");

    // set transition size to what is required
    transitionElement.style.width=width+"px";
    transitionElement.style.height=Math.max((height-header.offsetHeight),content.offsetHeight+header.offsetHeight)+"px";
    transitionElement.style.top=header.offsetHeight+"px";

    // play intro animation
    console.log("intro playing");
    content.classList.add("closed");
    transitionElement.classList.remove("before");
    transitionElement.classList.add("during");
    await sleep(250);

    // set content
    await setContent(name);

    // play outro animation
    console.log("outro playing");
    transitionElement.classList.remove("during");
    transitionElement.classList.add("after");
    content.classList.remove("closed");
    await sleep(250);

    // reset to start position
    console.log("resetting to start position");
    transitionElement.classList.add("notransition");
    transitionElement.offsetHeight; // update css
    await sleep(10); // wait a little to ensure
    transitionElement.classList.remove("after");
    transitionElement.classList.add("before");
    transitionElement.offsetHeight; // update css
    transitionElement.classList.remove("notransition");

    headerFontChanger.running=false;
    headerFontChanger.elements=document.querySelectorAll("#content h2");
    headerFontChanger.running=true;
    headerFontChanger.changeFont();

    time_elapsed=Date.now()-start
    running=false;
    console.log(`animation finished for ${name}`)
    console.log(`Elapsed time: ${time_elapsed} (${time_elapsed-510} without waiting)`)
}

var isonline=true;

window.addEventListener('offline', () => {
    console.log('Offline');
    alert("Notice: Website will not work offline");
    isonline=false
});
window.addEventListener('online', () => {
    console.log('Online');
    // alert("Back online");
    isonline=true
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
    // headerFontChanger.changeFont();
});

const baseFonts=["Courier Prime","Source Code Pro","Nothing You Could Do","Whisper","Mona Sans"];
var fonts = [...baseFonts];

function fontChanger(elements,delay){
    console.log("Font changer element initialized");

    this.elements=elements;
    this.delay=delay;

    this.running=true;

    this.curFonts=[...baseFonts];

    this.changeFont=() => {
        let index = Math.floor(Math.random() * this.curFonts.length);
        let newFont=this.curFonts[index];
        this.elements.forEach((element)=>{
            element.style.fontFamily=newFont;
        });
        this.curFonts.splice(index,1);
        if (this.curFonts.length === 0){
            this.curFonts=[...baseFonts];
            this.curFonts.splice(this.curFonts.indexOf(newFont),1);
        }
        this.waitFont();
    }

    this.waitFont=() => {
        if (this.running && window.screen.width > 670 && transitionsOn){
            setTimeout(this.changeFont, delay);
        } else {
            this.elements.forEach((curTitle)=> {
                curTitle.style.fontFamily="Mona Sans";
            })
            setTimeout(this.waitFont,delay*2);
        }
    }
}


const title = document.querySelectorAll(".header-letter");
const titleFontChanger = new fontChanger(title,750);
titleFontChanger.changeFont();
const headerFontChanger = new fontChanger(document.querySelectorAll("#content h2"),3500);
headerFontChanger.changeFont();