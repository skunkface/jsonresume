var page = require('webpage').create();
var fs = require('fs');

page.onLoadFinished = function () {
    console.log(page.content);
    phantom.exit();
};

page.open("localhost:5000/resume", function () {
    page.evaluate(function () {
    });
});
