import {findGetParameter} from '../js/gallery.js';
import {pageFromURL} from '../js/gallery.js';
//import {displayPage} from '../js/gallery.js';

QUnit.module('URL-Parsing', function() {

    QUnit.test('check that findGetParameter parses a page number from valid query page=1', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(location + "?page=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('check that findGetParameter parses a page number from valid query page=5', function(assert) {
        let pageNumber = 5;
        let testUrl = new URL(location + "?page=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('check that findGetParameter returns null when page parameter is misspelled', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(location + "?pag=" + pageNumber);
        let output = findGetParameter(testUrl, "page");
        assert.equal(null, output);
    });

    QUnit.test('pageFromURL for valid url with query ?page=1 should return 1', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(location + "?page=" + pageNumber);
        let output = pageFromURL(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('pageFromURL for valid url with query ?page=5 should return 5', function(assert) {
        let pageNumber = 5;
        let testUrl = new URL(location + "?page=" + pageNumber);
        let output = pageFromURL(testUrl, "page");
        assert.equal(pageNumber, output);
    });

    QUnit.test('pageFromURL for invalid url with query ?page=0 should throw an error', function(assert) {
        let pageNumber = 0;
        let testUrl = new URL(location + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?page=6 should throw an error', function(assert) {
        let pageNumber = 6;
        let testUrl = new URL(location + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?page=a should throw an error', function(assert) {
        let pageNumber = "a";
        let testUrl = new URL(location + "?page=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

    QUnit.test('pageFromURL for invalid url with query ?pa=1 should throw an error', function(assert) {
        let pageNumber = 1;
        let testUrl = new URL(location + "?pa=" + pageNumber);
        try {
            let output = pageFromURL(testUrl, "page");
            assert.true(false);
        } catch (error) {
            assert.true(true);
        }
    });

});
