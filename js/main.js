window.onload = loaded;
const pageImg = document.getElementById("page-display");

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
    // Assign to a variable so we can set a breakpoint in the debugger!
    const hello = sayHello();
    console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
export function sayHello() {
    return 'hello';
}

displayPage(".displayPage");

function displayPage() {
    pageImg.src = "../pages/page-1.jpg";
    document.querySelector(div).innerHTML = '<img src="../pages/page-1.jpg">';
}
