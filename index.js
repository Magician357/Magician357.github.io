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
        next_div.classList.add("active");
        started=false;
        cycle_buttons()
    }
});

const next_div = document.getElementById("next");

for (const button of next_div.children){
    if (button.id === "long"){
        continue;
    }
    button.onclick = (e) => {
        if (e.target.tagName != "BUTTON"){
            button.classList.add("active");
            start_div.classList.add("hide");
            next_div.classList.add("hide");
        }
    };
    let close = button.getElementsByTagName("button")[0];
    close.onclick = () => {
        button.classList.remove("active");
        start_div.classList.remove("hide");
        next_div.classList.remove("hide");
    }

    let label = button.getElementsByClassName("label")[0];
    let current = document.createElement("p");
    current.innerText = label.innerText;
    current.classList.add("fake-label");
    button.appendChild(current);
}

const to_cycle = [
    {
        "pos1":"pos2",
        "pos2":"pos3",
        "pos3":"pos4",
        "pos4":"pos5",
        "pos5":"pos1"
    },
    {
        "pos1":"pos5",
        "pos2":"pos1",
        "pos3":"pos2",
        "pos4":"pos3",
        "pos5":"pos4"
    }
];
const notransition = [
    "pos4",
    "pos5"
]

function cycle_buttons(which=0){
    if (!scrolling){
        scrolling=true;
        for (const button of next_div.children){
            if (button.id === "long"){
                continue;
            }
            let current_class = button.className.split(' ')[0];
            button.classList.add(to_cycle[which][current_class]);
            button.classList.remove(current_class);
            button.classList.remove("notransition");
            if (current_class === notransition[which]) button.classList.add("notransition");
        }
        setTimeout(() => {
            scrolling=false;
        }, 1000);
    }
}

var scrolling = false;
var ignore_amt = 0;
next_div.addEventListener("scroll",(ev)=>{
    // console.log("scrolled!");
    if (!scrolling){
        if (ignore_amt === 0){
            cycle_buttons(next_div.scrollTop > 10? 1 : 0);
            next_div.style.overflowY = "hidden";
            setTimeout(() => {
                // scrolling=false;
                next_div.scrollTop = 10;
                next_div.style.overflowY = "scroll";
                ignore_amt+=1;
            }, 1000);
        } else {
            ignore_amt -= 1;
        }
    }
});