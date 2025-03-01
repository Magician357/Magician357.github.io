const start_text = document.getElementById("start-text").innerText;

const start_div = document.getElementById("start");

// const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
const lowercase = "qwertyuiopasdfghjklzxcvbnm-+<>";

const delay = 35;
const amount = 20;

function stagger_start(current = 0){
    let char = start_text.charAt(current);

    let element = document.createElement("p");
    element.dataset.char=char;
    if (lowercase.includes(char)){
        element.dataset.pos = lowercase;
    } else {
        element.dataset.pos = uppercase;
    }
    element.innerText=" ";

    start_div.appendChild(element);
    cycle(element,amount);
    if (current+1 < start_text.length){
        setTimeout(() => {
            stagger_start(current+1);
        }, delay);
    }
}

function cycle(element,amount,current=0){
    console.log(current,amount);
    if (current === amount){
        element.innerText = element.dataset.char;
        return
    }

    let possibilities = element.dataset.pos
    let new_char = element.innerText;
    while (new_char === element.innerText){
        new_char = possibilities.charAt(Math.floor(Math.random()*possibilities.length));
        console.log(new_char);
    }
    element.innerText = new_char;

    setTimeout(() => {
        cycle(element,amount,current+1);
    }, delay);
}

stagger_start();