export const dataEvent = new Event('dataReady');
export const commentAddEvent = new Event('commentAdded');
export const commentDeleteEvent = new Event('commentDeleted');

/**
 * Send comment data to the table
 * @param {*} data 
 */
export function sendData(data) {
    const author = sanitizeString(data.get('username'));
    const content = sanitizeString(data.get('comment'))
    try{
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://cw5ebt4e77.execute-api.us-east-2.amazonaws.com/comments");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            "pageId": data.pageNumber.toString(),
            "commentId": data.timeStamp.toString(),
            "author": author,
            "content": content
        }));
        xhr.addEventListener("load", function () {
            console.log(xhr.response);
            document.dispatchEvent(commentAddEvent);
        });
    } catch (error) {
        throw new Error("Failed posting comment. Error: " + error);
    }
}

/**
 * Request all comments associated with parition key pageNum
 * @param {*} holder 
 * @param {*} pageNum 
 */
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
        throw new Error("Failed loading comments. Error: " + error);
    }
}

/**
 * Delete a comment with its partition key pageNum and sort key commentId
 * @param {*} pageNum 
 * @param {*} commentId 
 */
export function deleteComment(pageNum, commentId){
    try {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            document.dispatchEvent(commentDeleteEvent);
            //writeComments(".writeComments");
        })
        xhr.open("DELETE", "https://cw5ebt4e77.execute-api.us-east-2.amazonaws.com/comments/" + pageNum + "/" + commentId);
        xhr.send();
    } catch(error) {
        alert("Failed deleting comment. Error: " + error);
    }
}

/**
 * Remove potentially dangerous characters or commands from user text input
 * @param {*} input 
 * @returns 
 */
function sanitizeString(input){
    var str = encodeString(input, false)
    return str;
}

/**
 * Encode and decode a set of potentially dangerous characters or phrases to
 * sanitize user inputs
 * @param {*} input 
 * @param {*} decoding 
 * @returns 
 */
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