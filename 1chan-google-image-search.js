// ==UserScript==
// @name         1chan-google-image-search
// @namespace    1chan
// @version      1
// @description  Искать картинки в Гугле
// @author       bitbucket.org/wwwwwwwwwww/
// @match        https://1chan.ca/*
// @match        https://*.1chan.ca/*
// @include      https://1chan.ca/*
// @include      https://*.1chan.ca/*
// @icon         http://web.archive.org/web/20170302140107/https://1chan.ca/favicon.ico
// @grant        none
// ==/UserScript==

$('a > img[src^=https://i.imgur.com/]').each(function(){
    var imageSRC = $(this).attr('src');
    var googleSearchURL = 'https://www.google.com/searchbyimage?image_url=' + imageSRC;
    $('<a/>')
        .attr({
            'target' : '_blank',
            'href' : googleSearchURL
        })
        .text('G')
        .insertAfter(this);
});
