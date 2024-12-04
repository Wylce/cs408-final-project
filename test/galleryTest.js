import {findGetParameter, pageFromURL} from '../js/components.js';
import {displayPage, getPageHtml} from '../js/gallery.js';

//import {displayPage} from '../js/gallery.js';

var urlBase = "https://example.com";

QUnit.module('URL-Parsing', function() {

    QUnit.test('check that findGetParameter parses a page number from valid query page=1', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('check that findGetParameter parses a page number from valid query page=5', function(assert) {
        let pageNumber = 5;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('check that findGetParameter returns null when page parameter is misspelled', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(urlBase + "?pag=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(null, output);
    });

    QUnit.test('pageFromURL for valid url with query ?page=1 should return 1', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        let output = pageFromURL(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('pageFromURL for valid url with query ?page=5 should return 5', function(assert) {
        let pageNumber = 5;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        let output = pageFromURL(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('pageFromURL for invalid url with query ?page=0 should throw an error', function(assert) {
        let pageNumber = 0;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?page=6 should throw an error', function(assert) {
        let pageNumber = 6;
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?page=a should throw an error', function(assert) {
        let pageNumber = "a";
        let testUrl = new URL(urlBase + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?pa=1 should throw an error', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(urlBase + "?pa=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

});

QUnit.module('Gallery', function() {

    QUnit.test('output of getPageHtml for valid page 1 should be valid html to set a div with children DIV -> DIV -> IMG', function(assert){
        let pageNumber = 1;
        
        let testDiv = document.createElement('div');
        let content = getPageHtml(pageNumber);

        testDiv.innerHTML = content;

        const firstChild = testDiv.firstChild;
        assert.equal(firstChild.nodeName, "DIV");
        assert.notEqual(firstChild.nodeName, "IMG");
        const secondChild = firstChild.firstChild;
        assert.equal(secondChild.nodeName, "IMG");
        assert.notEqual(secondChild.nodeName, "DIV");
    });

    QUnit.test('Second Child of a div created with getPageHtml output for valid page 1 should have alt text and title matching page 1 of pageData', function(assert){
        let pageNumber = 1;
        let expectedPath = location.protocol + "//" + location.host + "/pages/page-1.jpg";

        let testPageData = pageData[pageNumber - 1];
        let testDiv = document.createElement('div');
        let content = getPageHtml(pageNumber);

        testDiv.innerHTML = content;

        const secondChild = testDiv.firstChild.firstChild;
        assert.equal(secondChild.alt, testPageData.alt);
        assert.equal(secondChild.title, testPageData.title);
        assert.equal(secondChild.src, expectedPath);
    });

    QUnit.test('Second child of a div created with getPageHtml output for invalid page 6 should have expected error alt text and title', function(assert){
        let pageNumber = 6;
        let expectedPath = location.protocol + "//" + location.host + "/pages/page-";

        let expectedAlt = "Error: Image data not found";
        let expectedTitle = "Error: Image data not found";

        console.log("Test invalid");
        let testDiv = document.createElement('div');
        let content = getPageHtml(pageNumber);
        testDiv.innerHTML = content;

        const secondChild = testDiv.firstChild.firstChild;
        assert.equal(secondChild.alt, expectedAlt);
        assert.equal(secondChild.title, expectedTitle);
        assert.equal(secondChild.src, expectedPath);
    });

    /*
    QUnit.test('display page sets correct title and alt text for valid page number 1', function(assert) {
        let pageDisplay = document.querySelector(".displayPage");
        
        displayPage(".displayPage");

        assert.true(true);
    });*/
});