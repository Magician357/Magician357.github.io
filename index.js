const start_text = document.getElementById("start-text").innerText;

const start_div = document.getElementById("start");

const start_text_div = document.getElementById("start-text-div");
var started = false;

// const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
const lowercase = "qwertyuiopasdfghjklzxcvbnm-+<>";
const space = " "

const delay = 35;
const amount = 20;

function stagger_start(current = 0){
    let char = start_text.charAt(current);

    let element = document.createElement("p");
    element.dataset.char=char;
    if (space.includes(char)){
        element.dataset.pos = space;
    } else if (lowercase.includes(char)){
        element.dataset.pos = lowercase;
    } else {
        element.dataset.pos = uppercase;
    }
    element.innerText=" ";

    start_text_div.appendChild(element);
    cycle(element,amount,(current+1===start_text.length));
    if (current+1 < start_text.length){
        setTimeout(() => {
            stagger_start(current+1);
        }, delay);
    }
}

function cycle(element,amount,end,current=0){
    if (current === amount){
        element.innerText = element.dataset.char;
        if (end){
            setTimeout(() => {
                start_text_div.classList.add("active");
                started = true;
            }, delay);
        }
        return
    } else {

        let possibilities = element.dataset.pos
        // let new_char = element.innerText;
        // while (new_char === element.innerText){
        //     new_char = possibilities.charAt(Math.floor(Math.random()*possibilities.length));
        //     console.log(new_char);
        // }
        // element.innerText = new_char;
        element.innerText = possibilities.charAt(Math.floor(Math.random()*possibilities.length));

        setTimeout(() => {
            cycle(element,amount,end,current+1);
        }, delay);
    }
}

stagger_start();

start_text_div.addEventListener("click",(ev)=>{
    if (started){
        start_div.classList.add("active");
        start_text_div.classList.remove("active");  
        started=false;
    }
});