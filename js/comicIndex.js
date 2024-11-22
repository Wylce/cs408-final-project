import {findGetParameter} from '../js/components.js';
import {pageFromURL} from '../js/components.js';

writeIndex(".write-index");

function writeIndex(div){
    let content = `<ul class="link-list">`;
    pageData.forEach((element) => {
        content += `<li class="page-index">`;
        content += `<a href="gallery.html?page=` + element.pageNum + `" title="` + element.title + `"> Page ` + element.pageNum + `<br><img class="thumbnail" src="../thumbnails/thumb-` + element.pageNum + `.jpg" alt="Page ` + element.pageNum + `thumbnail"></a><br>`;
        content += ``
        content += "</li>";
    })
    content += "</ul>"
    document.querySelector(div).innerHTML = content;
}