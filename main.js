const DEF_DELAY = 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

const content=document.getElementById("content")
function setContent(name) {
    console.log(name);
    const myRequest = new Request(`pages/${name}.html`);
    fetch(myRequest)
    .then((response) => response.text())
    .then((text) => {
        content.innerHTML = text;
    });
}

window.addEventListener("load", async (event) => {
    setContent("styletest");
});

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
var width  = Math.max( body.scrollWidth,  body.offsetWidth,  html.clientWidth,  html.scrollWidth,  html.offsetWidth );

const header=document.getElementById("header");
const transitionElement=document.getElementById("transition");
async function changeContent(name){
    transitionElement.style.width=width+"px";
    transitionElement.style.height=Math.max((height-header.offsetHeight),content.offsetHeight+header.offsetHeight)+"px";
    transitionElement.style.top=header.offsetHeight+"px";

    content.classList.add("closed");
    transitionElement.classList.remove("before");
    transitionElement.classList.add("during");
    await sleep(300);

    setContent(name);
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