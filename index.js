function $(target){
    return document.querySelector(target);
}

function getRandom(){
    return Math.floor(Math.random() * 4);
}

var genius, control, girls = ['r', 'w', 'b', 'y'], points = 0, running = false;

function animate(girl){
    new Audio(`Sounds/${girl}.ogg`).play();
    $(`.${girl} img`).classList.add('ain');
}

function deanimate(girl){
    $(`.${girl} img`).classList.remove('ain');
}

function round(){
    control = 0;
    genius.push(girls[getRandom()]);
    animate(genius[0]);
    setTimeout(function(){
        $(`.${genius[0]} img`).classList.remove('ain');
    }, 750);
    let y = 1, interval = setInterval(function(){
        if(y===genius.length){
            deanimate(genius[y - 1]);
            clearInterval(interval);
            return;
        }
        deanimate(genius[y-1]);
        animate(genius[y]);
        y++;
    }, 750); 
    return true;
}

function start(){
    genius = [], points = 0;
    $('.start').innerHTML = 'READY'
    let x = 4, interval = setInterval(function(){
        x--;
        if(x===0){
            $('.start').innerHTML = 'GO!';
            round();
            clearInterval(interval);
            return;
        }
        $('.start').innerHTML = x;
        console.log(x); 
    }, 1000); 
}

function verify(c){
    if(running===false){
        return;
    }

    if(genius[control]==c){
        control++;
        if(control == genius.length){
            new Audio(`Sounds/point.ogg`).play();
            points++;
            $('.start').innerHTML = `<span style="color:#048a4c">${points}</span>`;
            setTimeout(function(){
                round();
            }, 750);
        }
    }
    else{
        new Audio(`Sounds/lose.ogg`).play();
        $('.start').innerHTML = '<span style="font-size: 0.7em;display: block;line-height: 20px;margin-top: 45px;"><span style="color: #f04747;">Game Over</span> Try Again?</span>';
        running = false;
    }
}

//event triggers
$('.start').addEventListener('click', function(){
    if(running===false){running=true; start()}
});

document.querySelectorAll('.bew').forEach(function(elem) {
    elem.addEventListener("mouseover", function() {
        elem.previousElementSibling.classList.add('aww');
    });
    elem.addEventListener("mouseout", function() {
        elem.previousElementSibling.classList.remove('aww');
    });
    elem.addEventListener("pointerdown", function() {
        elem.previousElementSibling.classList.add('ain');
    });
    elem.addEventListener("pointerup", function() {
        elem.previousElementSibling.classList.remove('ain');
    });
    elem.addEventListener("pointerleave", function() {
        elem.previousElementSibling.classList.remove('ain');
    });
});

document.querySelectorAll('.waifus section').forEach(function(elem) {
    elem.addEventListener("click", function() {
        verify(elem.className);
    });
});

//credits toggle
$('.c').addEventListener('click', function(){
    $('.overlay').classList.add('display');
});

$('.overlay').addEventListener('click', function(e){
    if(e.target.className!=='credits') $('.overlay').classList.remove('display');
});

console.log('fui eu não hein foi o salies');