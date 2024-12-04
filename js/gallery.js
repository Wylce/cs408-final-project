import {pageFromURL} from '../js/components.js';
import {getPageComments, sendData, deleteComment, encodeString} from '../js/commentsHandler.js';

var currentPage = null;
try {
    currentPage = pageFromURL(location);
} catch (e){
    let alertMessage = e.message + " You've been directed to page 1.";
    alert(alertMessage);
    location.assign("?page=1");
}

console.log("Current page: " + currentPage);

export function getCurrentPage(){
    return currentPage;
}

//Components of the page image file addresses
const imgFolder = "../pages";
const pre = "page-";
const ext = "jpg";

//Call the html generator functions on the placeholder divs in html file
writePageButtons();
displayPage(".displayPage");
writeTags(".writeTags", currentPage);
writeComments(".writeComments");

/**
 * Generate html for the current comic page and slot it into parameter div
 * @param {*} div 
 */
export function displayPage(div) {
    if (!currentPage){ //default to the first page
        currentPage = 1;
    }
    document.querySelector(div).innerHTML = getPageHtml(currentPage);
}

//Moved into a separate function for testing
export function getPageHtml(page){
    let altText = "Error: Image data not found";
    let title = "Error: Image data not found";

    let path = imgFolder.concat("/", pre);

    if (pageData.length < page){
        //leave path incomplete so that error alt text will display
    } else if (pageData.length >= page) {
        let pageInfo = pageData[page - 1];
        altText = pageInfo.alt;
        title = pageInfo.title;

        path = path.concat(page, ".", ext)
    }
    const content = `<div class="comic-page"><img class = page-display alt="${altText}" title="${title}" src="${path}"></div>`;
    console.log("content: " + content);
    return content;
}

/**
 * Generate html for the left and right page navigation keys
 */
function writePageButtons() {
    let pageButtonDiv = document.querySelectorAll(".writePageButtons");
    pageButtonDiv.forEach(function(divElement) {
        divElement.innerHTML = `<div class="comic-nav">
            ${prevButton()}
            <p class="page-number">${currentPage}</p>
            ${nextButton()}
            </div>`;
    })

    function prevButton() {
        const activeNav = `<img src="../assets/arrow-left-temp.png" class="active-nav" alt="Previous Page" title="Previous">`;
        const inactiveNav = `<img src="../assets/arrow-left-temp.png" class="inactive-nav" alt="No Previous Page" title="No previous page">`;
    
        if (!currentPage){
            return inactiveNav;
        }

        if (currentPage > 1){
            return `<a href=?page=` + (currentPage - 1) + `> ` + activeNav + `</a>`;
        } else {
            return inactiveNav;
        }
    }

    function nextButton() {
        const activeNav = `<img src="../assets/arrow-right-temp.png" class="active-nav" alt="Next Page" title="Next">`;
        const inactiveNav = `<img src="../assets/arrow-right-temp.png" class="inactive-nav" alt="No Next Page" title="No next page">`;
        if (!currentPage){
            return inactiveNav;
        }

        if (currentPage < pageData.length){
            return `<a href=?page=` + (currentPage + 1) + `> ` + activeNav + `</a>`;
        } else {
            return inactiveNav;
        }
    }
}

/**
 * Write tags underneath the page as comic-index links that filter by that tag.
 * Tags are hard-coded in pageData
 * @param {*} div 
 * @param {*} pageNum 
 */
function writeTags(div, pageNum){
    let content = "";

    content += `<ul class="tag-list"> tags: `;
    pageData[pageNum - 1].tags.forEach((tag) => {
        content += `<li><a href="comic-index.html?filter=` + tag + `"> ` + tag + `</a></li>`;
    })
    content += "</ul></li>";
    document.querySelector(div).innerHTML = content;
}

//Event listeners to reqrite the comments section when a change occurs
document.addEventListener('commentAdded', function () {
    console.log("comments updated");
    writeComments(".writeComments")});

document.addEventListener('commentDeleted', function () {
    console.log("comments updated");
    writeComments(".writeComments")});

/**
 * Call commentsHandler functions to get comment data from AWS and write it as html into the writeComments plaveholder div
 * @param {*} div 
 */
export function writeComments(div){
    console.log("writing comments");
    //holder is an empty object that will have a data property added to it when the HTTP request loads
    const holder = new Object();

    document.addEventListener('dataReady', function () {
        //Empty the div so that an updated comments list isn't added to the end when posted or deleted
        document.querySelector(div).innerHTML = '';
        const commentList = document.createElement('ul');
        holder.data.forEach((comment) => {
            //The Comment ID is the date in milliseconds when the comment was created
            //Need to parse that string back into a number, then into a datetime
            const timestamp = new Date(parseInt(comment.commentId));
            
            var commentDiv = document.createElement('li');
            commentDiv.setAttribute("class", "comment-container");

            let header = document.createElement('h3');
            header.class = "comment-author";
            let author = encodeString(comment.author, true);
            header.textContent = author;
            commentDiv.appendChild(header);

            let time = document.createElement('time');
            time.dateTime = timestamp;
            time.textContent = formatDate(timestamp);
            commentDiv.appendChild(time);
            
            let paragraph = document.createElement('p');
            paragraph.class = "comment-content";
            let content = encodeString(comment.content, true);
            paragraph.textContent = content;
            commentDiv.appendChild(paragraph);

            const deleteLink = document.createElement('a');
            deleteLink.setAttribute("href", "#");
            deleteLink.setAttribute("title", "Delete");
            deleteLink.textContent = "Delete Comment";
            deleteLink.addEventListener('click', function(event) {
                event.preventDefault();
                deleteComment(currentPage, comment.commentId);
            });
            commentDiv.append(deleteLink);

            commentList.insertBefore(commentDiv, commentList.firstChild);
        })
        document.querySelector(div).appendChild(commentList);
        console.log(holder.data);
    })

    try {
        getPageComments(holder, currentPage);
    } catch (error) {
        document.querySelector(div).innerHTML = "Could not load comments: " + error;
    }
}

const commentSubmission = document.getElementById("comments-submission");
commentSubmission.addEventListener("submit", function(event) {
    event.preventDefault();
    //check data
    try{
        let data = new FormData(commentSubmission);
        data.timeStamp = Date.now();
        data.pageNumber = currentPage;
        sendData(data)
        //sendData(new FormData(commentSubmission));
    } catch (error){
        alert(error);
    }
    commentSubmission.reset();
})

/**
 * Utility function for formatting a date object into a 'month day year time am/pm' format
 * @param {*} date 
 * @returns 
 */
function formatDate(date){
    var dateString = date.toDateString().substring(3);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var ampm = "am";
    if(hour > 12){
        hour = hour - 12;
        ampm = "pm";
    }
    if(date.getMinutes() < 10){
        minutes = "0" + minutes;
    }
    return `${dateString}, ${hour}:${minutes} ${ampm}`;
}