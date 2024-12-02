import {findGetParameter} from '../js/components.js';
import {pageFromURL} from '../js/components.js';
import {getPageComments, deleteComment} from '../js/commentsHandler.js';

import {commentPostEvent} from '../js/commentsHandler.js';

let currentPage = null;
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

writePageButtons();
displayPage(".displayPage");
writeTags(".writeTags", currentPage);
writeComments(".writeComments");


export function displayPage(div) {

    let altText = "Error: Image alt text not found";
    let title = "Error: Image title not found";

    if (!currentPage){ //default to the first page
        currentPage = 1;
    }

    if (pageData.length < currentPage){
        //TODO: handling
    } else if (pageData.length >= currentPage) {
        let pageInfo = pageData[currentPage - 1];
        altText = pageInfo.altText;
        title = pageInfo.title;

        document.querySelector(div).innerHTML = getPageHtml(currentPage);
    }
}

//Moved into a separate function for testing
export function getPageHtml(page){
    let altText = "Error: Image alt text not found";
    let title = "Error: Image title not found";

    //if (!currentPage){ //default to the first page
    //    currentPage = 1;
    //}

    if (pageData.length < page){
        //TODO: handling
    } else if (pageData.length >= page) {
        let pageInfo = pageData[page - 1];
        altText = pageInfo.altText;
        title = pageInfo.title;

        const path = imgFolder.concat("/", pre, page, ".", ext)
        const content = '<div class="comic-page"><img class = page-display alt=' + altText + ' title=' + title + ' src=' + path + '></div>';
        return content;
    }
}

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
            //TODO handle error
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

function writeTags(div, pageNum){
    let content = "";

    content += `<ul class="tag-list"> tags: `;
    pageData[pageNum - 1].tags.forEach((tag) => {
        content += `<li><a href="comic-index.html?filter=` + tag + `"> ` + tag + `</a></li>`;
    })
    content += "</ul></li>";
    document.querySelector(div).innerHTML = content;
}

export function writeComments(div){
    const holder = new Object();

    document.addEventListener('dataReady', function () {
        //Empty the div so that an updated comments list isn't added to the end when posted or deleted
        document.querySelector(div).innerHTML = '';
        const commentList = document.createElement('ul');
        holder.data.forEach((comment) => {
            //The Comment ID is the date in milliseconds when the comment was created
            //Need to parse that string back into a number, then into a datetime
            const timestamp = new Date(parseInt(comment.commentId));
            var commentDiv = document.createElement('div');
            commentDiv.setAttribute("class", "comment-container");

            let header = document.createElement('h3');
            header.class = "comment-author";
            header.textContent = comment.author;
            commentDiv.appendChild(header);

            let time = document.createElement('time');
            time.dateTime = timestamp;
            time.textContent = timestamp;
            commentDiv.appendChild(time);
            
            let paragraph = document.createElement('p');
            paragraph.class = "comment-content";
            paragraph.textContent = comment.content;
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
            //content = innerContent + content;
            //commentList.appendChild(commentDiv);
            commentList.insertBefore(commentDiv, commentList.firstChild);
        })
        //outerContent += content;
        //outerContent += `</ul>`;
        document.querySelector(div).appendChild(commentList);
        console.log(holder.data);
    })

    getPageComments(holder, currentPage);
}

function sayHi(){
    alert("hi");
}