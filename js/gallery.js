let currentPage = null;
try {
    currentPage = pageFromURL(location);
} catch (e){
    let alertMessage = e.message + " You've been directed to page 1.";
    currentPage = 1;
    alert(alertMessage);
}

console.log("Current page: " + currentPage);

//Components of the page image file addresses
const imgFolder = "../pages";
const pre = "page-";
const ext = "jpg";

writePageButtons();
displayPage(".displayPage");


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

export function pageFromURL(url){
    const page = findGetParameter(url, "page");
    if (!page){
        throw new Error ("Unable to parse parameter 'page' from url.");
    }

    const pageNum = Number(page)

    if(!pageNum || page <= 0 || page > pageData.length){
        throw new Error('Page ' + page + ' does not exist.');
    }
    return pageNum;
}

export function findGetParameter(url, parameterName){
    let result = null;
    let item = url.search.substr(1);
    //let items = location.search.substr(1).split("&");
    let tmp = item.split("=");
    if (tmp[0] === parameterName) result = tmp[1]; //decodeURIcomponent(tmp[1])

    return result;
}