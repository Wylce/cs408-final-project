import{getCurrentPage} from '../js/gallery.js';
import{writeComments} from '../js/gallery.js';

export const dataEvent = new Event('dataReady');
export const commentPostEvent = new Event('commentPosted');

const commentSubmission = document.getElementById("comments-submission");
commentSubmission.addEventListener("submit", function(event) {
    event.preventDefault();
    //check data
    sendData(new FormData(commentSubmission));
    commentSubmission.reset();
})

function sendData(data) {
    console.log(getCurrentPage());
    console.log(Date.now());
    console.log(data.get('username'));
    console.log(data.get('comment'));
    const author = sanitizeString(data.get('username'));
    const content = sanitizeString(data.get('comment'))
    try{
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://cw5ebt4e77.execute-api.us-east-2.amazonaws.com/comments");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            "pageId": getCurrentPage().toString(),
            "commentId": Date.now().toString(),
            "author": author,
            "content": content
        }));
        xhr.addEventListener("load", function () {
            console.log(xhr.response);
            //document.dispatchEvent(commentPostEvent);
            writeComments(".writeComments");
        });
    } catch (error) {
        console.log("Failed posting comment. Error: " + error);
    }
}

export function getPageComments(holder, pageNum){
    try {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load", function () {
            holder.data = xhr.response;
            document.dispatchEvent(dataEvent);
        });
        xhr.open("GET", "https://cw5ebt4e77.execute-api.us-east-2.amazonaws.com/comments/" + pageNum);
        xhr.send();
    } catch(error) {
        alert("Failed loading comments. Error: " + error);
    }
}

export function deleteComment(pageNum, commentId){
    try {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            writeComments(".writeComments");
        })
        xhr.open("DELETE", "https://cw5ebt4e77.execute-api.us-east-2.amazonaws.com/comments/" + pageNum + "/" + commentId);
        xhr.send();
    } catch(error) {
        alert("Failed deleting comment. Error: " + error);
    }
}

function sanitizeString(input){
    var str = encodeString(input, false)
    return str;
}

export function encodeString(input, decoding){
    var str = input;
    console.log("encoding");

    const encoding = [["\"", "&quot"], ["\'", "&#39"], ["\`", "&#96"],
                        ["<", "&#60"], [">", "&#62"], ["=", "&#61"],
                        ["GET", "&get"], ["PUT", "&put"], ["DELETE", "&del"]];

    encoding.forEach((pair) => {
        if (decoding){
            str = str.replace(pair[1], pair[0]);
        } else {
            str = str.replace(pair[0], pair[1]);
        }
    });
    return str;
}