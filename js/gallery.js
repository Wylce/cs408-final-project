import {findGetParameter} from '../js/components.js';
import {pageFromURL} from '../js/components.js';

let currentPage = null;
try {
    currentPage = pageFromURL(location);
} catch (e){
    let alertMessage = e.message + " You've been directed to page 1.";
    alert(alertMessage);
    location.assign("?page=1");
}

console.log("Current page: " + currentPage);

//Components of the page image file addresses
const imgFolder = "../pages";
const pre = "page-";
const ext = "jpg";

writePageButtons();
displayPage(".displayPage");
writeTags(".writeTags", currentPage);


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

        const path = imgFolder.concat("/", pre, currentPage, ".", ext)
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
        divElement.innerHTML = `<div class="comicNav">
            ${prevButton()}
            ${nextButton()}
            `;
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