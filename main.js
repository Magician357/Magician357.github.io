const DEF_DELAY = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

async function getData(url){
    const curRequest = new Request(url);
    return fetch(curRequest)
        .then((response)=>response.text())
        .then((text) => {
            return text
        });
}

const content=document.getElementById("content")
async function setContent(name) {
    console.log(name);
    // const myRequest = new Request(`pages/${name}.html`);
    // fetch(myRequest)
    // .then((response) => response.text())
    // .then((text) => {
    //     content.innerHTML = text;
    // });
    content.innerHTML=await getData(`pages/${name}.html`);
}

window.addEventListener("load", async (event) => {
    setContent("home");
});

var body = document.body,
    html = document.documentElement;

const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
const width  = Math.max( body.scrollWidth,  body.offsetWidth,  html.clientWidth,  html.scrollWidth,  html.offsetWidth );

const header=document.getElementById("header");
const transitionElement=document.getElementById("transition");
async function changeContent(name){
    transitionElement.style.width=width+"px";
    transitionElement.style.height=Math.max((height-header.offsetHeight),content.offsetHeight+header.offsetHeight)+"px";
    transitionElement.style.top=header.offsetHeight+"px";

    content.classList.add("closed");
    transitionElement.classList.remove("before");
    transitionElement.classList.add("during");
    await sleep(250);

    await setContent(name);
    // await sleep(100);
    transitionElement.classList.remove("during");
    transitionElement.classList.add("after");
    content.classList.remove("closed");
    await sleep(250);

    transitionElement.classList.add("notransition");
    transitionElement.offsetHeight;
    await sleep(10);
    transitionElement.classList.remove("after");
    transitionElement.classList.add("before");
    transitionElement.offsetHeight;
    transitionElement.classList.remove("notransition");
}

window.addEventListener('offline', () => {
    console.log('Became offline');
    alert("Notice: Website will not work offline");
});
window.addEventListener('online', () => {
    console.log('Became online');
    // alert("Back online");
});

var darkMode=false;
function toggleDarkmode(){
    darkMode=!darkMode;
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