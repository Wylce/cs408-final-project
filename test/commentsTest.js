import {getPageComments, sendData, deleteComment} from '../js/commentsHandler.js';

//import {displayPage} from '../js/gallery.js';

var urlBase = "https://example.com";

QUnit.module('CommentsHandler', function() {
    QUnit.test("Calling getPageComments with an object holder and valid page number 1 should give holder a data property object", function(assert){
        const listener = document.createElement('div');
        
        const done = assert.async();

        const holder = new Object();

        document.addEventListener('dataReady', function dataResponse() {
            assert.ok(holder.data);
            document.removeEventListener('dataReady', dataResponse);
            done();
        });

        getPageComments(holder, 1);
    });

    QUnit.test('Calling sendData with valid submission form data containg author, pageNumber, timestamp, and content should fire a commentsUpdated event', function(assert){
        const done1 = assert.async();
        const done2 = assert.async();
        
        const formData = new FormData();
        formData.append("username", "Test Author");
        formData.pageNumber = 1;
        formData.timeStamp = Date.now();
        formData.append("comment", "This is a test comment.");

        document.addEventListener('commentAdded', function addResponse() {
            assert.true(true);
            deleteComment(formData.pageNumber, formData.timeStamp);
            document.addEventListener('commentDeleted', function delResponse() {
                assert.true(true);
                document.removeEventListener('commentDeleted', delResponse);
                done2();
            });
            document.removeEventListener('commentAdded', addResponse);
            done1();
        });
        sendData(formData);
    });

    QUnit.test('Calling getData after sending a valid comment should return a set of comments containing the new comment', function(assert){
        const done = assert.async();

        const holder = new Object();

        const formData = new FormData();
        formData.append("username", "Test Author");
        formData.pageNumber = 1;
        formData.timeStamp = Date.now();
        formData.append("comment", "This is a test comment.");

        document.addEventListener('commentAdded', function () {
            console.log("comment added");
            document.addEventListener('dataReady', function () {
                var result = false;
                holder.data.forEach((comment => {
                    if (parseInt(comment.commentId) === formData.timeStamp){
                        result = true;
                    }
                }))
                assert.true(result);
                deleteComment(formData.pageNumber, formData.timeStamp);
                done();
            });
            getPageComments(holder, formData.pageNumber);
    
        });
        sendData(formData);
    });
});