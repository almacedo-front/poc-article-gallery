var startX;
var startY;
var endX;
var endY;
var treshold = 10; //this sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers
var articlesTotal = document.querySelectorAll('article').length;
var count = 0;

function updateCount(){
    if(count > articlesTotal-1){
        count = articlesTotal-1
    }

    if(count < 0){
        count = 0
    }

    return count;
}

function slideArticles(dir){
    let wrapper = document.querySelector('.articles');
    let firstChild = wrapper.querySelector('article');
    let pos = parseInt(updateCount()*100);
    firstChild.style.marginLeft = `-${pos}vw`;    
}

function moveArticles(dist){
    let wrapper = document.querySelector('.articles');
    let firstChild = wrapper.querySelector('article');
    let pos = parseInt(updateCount()*100);
    console.log('dist: ',dist, ' pos: ', pos);
    if(pos){
        pos += dist;
        //console.log(' pos after: ', pos);
        firstChild.style.marginLeft = `-${pos}vw`;
    }else{
        firstChild.style.marginLeft = `-${dist}vw`;
    }
}

function getScroll(){
    let articles = document.querySelectorAll('article');

    articles.forEach(article => {
        article.addEventListener('scroll', (e) => {

            if(e.target.scrollTop <= 60){
                window.scrollTo({top:e.target.scrollTop});
            }

            //console.log('scrollHeight: ',e.target.scrollHeight, '\nscrollTop: ',e.target.scrollTop, '\nclientHeight: ', e.target.clientHeight);

            /* if((e.target.scrollHeight - e.target.scrollTop) >= e.target.clientHeight){
                console.log('asdads');
            } */

            console.log(window.scrollY)
            if(window.scrollY > 60){
                //console.log('diminuindo: ',window.scrollY)
                //window.scroll({top: (window.scrollY -10)});
            }
        })
    })

}

function resetScroll(){
    document.scrollTo(0);
}

//Function to handle swipes
function handleTouch(start,end, cbL, cbR){
  //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
  var xDist = endX - startX;
  var yDist = endY - startY;
  //console.log(xDist);
  //console.log(yDist);
  if(Math.abs(endX - startX) > treshold){
      if(endX - startX < 0){
         cbL();
       }else{
         cbR();
       }
  }
}

function handeTouchMove(dist){
    if(Math.abs(dist) > treshold){
        moveArticles(dist);
    }

}

//writing the callback fn()
var left = () =>{
    console.log('Swipe a esquerda');
    count++;
    slideArticles('left');
}
var right = () =>{
    console.log('Swipe a direita'); 
    count--;
    slideArticles('right');
}
var up = () =>{
 console.log('Swipe para cima'); 
}
var down = () =>{
 console.log('Swipe para baixo'); 
}

//configs the elements on load
window.onload = function(){
 window.addEventListener('touchstart', function(event){
   //console.log(event);
   startX = event.touches[0].clientX;
   startY = event.touches[0].clientY;
   //console.log(`the start is at X: ${startX}px and the Y is at ${startY}px`)
   
 })
  
  window.addEventListener('touchend', function(event){
   //console.log(event);
   endX = event.changedTouches[0].clientX;
   endY = event.changedTouches[0].clientY;
   //console.log(`the start is at X: ${endX}px and the Y is at ${endY}px`)
    
   handleTouch(startX, endX, left, right)
   
 })

 window.addEventListener('touchmove', function(event) {
    var total = (startX - event.touches[0].pageX);
    //var total = endX - event.changedTouches[0].clientX;
    //console.log('screenX:> ',total, ' startX: ', startX);
    console.log('event.changedTouches[0] ',event);
    handeTouchMove(total);
 });

 getScroll();


}