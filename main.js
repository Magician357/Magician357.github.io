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
}) 

function changeContent(name){
    
}