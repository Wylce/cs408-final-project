var currentFocus = null;

const imageList = document.querySelectorAll(".focusable");

imageList.forEach((image) => {
    image.addEventListener('click', moveFocus);
})

/**
 * Switch focus between different focusable images when one is clicked
 * @param {*} event 
 */
function moveFocus(event){
    if(currentFocus == null){
        console.log("click" +  event.currentTarget.className);
        event.currentTarget.className = "focus-image";
        currentFocus = event.currentTarget;
    }else if(currentFocus == event.currentTarget){
        event.currentTarget.className = "focusable";
        currentFocus = null;
    }else{
        currentFocus.className = "focusable";
        event.currentTarget.className = "focus-image";
        currentFocus = event.currentTarget;
    }
}