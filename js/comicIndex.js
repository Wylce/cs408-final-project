import {findGetParameter} from '../js/components.js';
import {pageFromURL} from '../js/components.js';

writeIndex(".write-index");


/**
 * Fill the given div with html for a list of links to comic pages, filtered
 * by url query filter
 * @param {*} div 
 */
function writeIndex(div){
    let filter = findGetParameter(location, "filter");
    console.log(filter);
    let content = `<ul class="link-list">`;

    let filteredIndex = [];

    //Check all page tags and put all pages that have the filter into filteredIndex
    if (!filter){
        filteredIndex = pageData;
    } else {
        filter = filter.toLowerCase()
        pageData.forEach((element) => {
            element.tags.forEach((tag) => {
                if (tag === filter){
                    filteredIndex.push(element);
                }
            });
        });
    }

    if (filteredIndex.length <= 0){
        content += `<li>Search term "`+ filter + `" did not match any pages</li>`;
    } else {
        filteredIndex.forEach((element) => {
            content += `<li class="page-index">`;
            content += `<a href="gallery.html?page=` + element.pageNum + `" title="` + element.title + `"> Page ` + element.pageNum + `<br><img class="thumbnail" src="../thumbnails/thumb-` + element.pageNum + `.jpg" alt="Page ` + element.pageNum + `thumbnail"></a><br>`;
        })
    }
    content += "</ul>"
    document.querySelector(div).innerHTML = content;
}