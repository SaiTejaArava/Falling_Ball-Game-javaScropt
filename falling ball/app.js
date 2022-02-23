var character=document.getElementById("character");
var game=document.getElementById("game");
var interval;
var both=0;
var counter=0;
var currentblocks=[];

function moveleft(){
    var left=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
    character.style.left=left-2+"px";}
}
function moveright(){
    var left=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
    character.style.left=left+2+"px";}
}

document.addEventListener("keydown",event =>{
    if(both==0){
        both++;
    if(event.key==="ArrowLeft"){
        interval=setInterval(moveleft,1);
    }
    if(event.key==="ArrowRight"){
        interval=setInterval(moveright,1);
    }
}
});
document.addEventListener("keyup",event =>{
    clearInterval(interval);
    both=0;
});

var blocks=setInterval(function(){
    var blocklast=document.getElementById("block"+(counter-1));
    var holelast=document.getElementById("hole"+(counter-1));

    if(counter>0){
    var blocklasttop=parseInt(window.getComputedStyle(blocklast).getPropertyValue("top"));
    var holelasttop=parseInt(window.getComputedStyle(holelast).getPropertyValue("top"));
}
if(blocklasttop<400 || counter==0){
var block=document.createElement("div");
var hole=document.createElement("div");
hole.setAttribute("class","hole");
block.setAttribute("class","block");
block.setAttribute("id","block"+counter);
hole.setAttribute("id","hole"+counter);
block.style.top=blocklasttop+100+"px";
hole.style.top=holelasttop+100+"px";
var random=Math.floor(Math.random()*360);
hole.style.left=random +"px";
game.appendChild(block);
game.appendChild(hole);
currentblocks.push(counter);
counter++;
}

var chartop=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
var charleft=parseInt(window.getComputedStyle(character).getPropertyValue("left"));
var drop=0;

if(chartop<=0 || chartop >=480){
    alert("Game Over -Score: "+(counter-9));
    clearInterval(blocks);
    location.reload();
}


for(var i=0;i<currentblocks.length;i++){
    let current =currentblocks[i];
    let iblock=document.getElementById("block"+current);
    let ihole=document.getElementById("hole"+current);
    let iblocktop=parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
    let iholeleft=parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

    iblock.style.top=iblocktop-0.5+"px";
    ihole.style.top=iblocktop-0.5+"px";
    if(iblocktop<-20){
        currentblocks.shift();
        iblock.remove();
        ihole.remove();
    }
    if(iblocktop-20<chartop && iblocktop>chartop){
        drop++;
        if(iholeleft<charleft && iholeleft+20>=charleft){
            drop=0;
        }
    }
}
if(drop==0){
    if(chartop<480){
    character.style.top=chartop+2+"px";
    }
}else{
    character.style.top=chartop-0.5+"px";
}


},1);
