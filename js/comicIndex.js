import {findGetParameter} from '../js/components.js';
import {pageFromURL} from '../js/components.js';

writeIndex(".write-index");

function writeIndex(div){
    let content = `<ul class="link-list">`;
    pageData.forEach((element) => {
        content += "<li>";
        content += `<a href="gallery.html?page=` + element.pageNum + `" title="` + element.title + `"> Page ` + element.pageNum + `</a><br>`;
        content += "</li>";
    })
    content += "</ul>"
    document.querySelector(div).innerHTML = content;
}