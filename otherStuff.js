// ==UserScript==
// @name         AdBlocker
// @namespace    https://github.com/addDetails/html
// @version      0.0.1
// @description  Block ads when browsing websites.
// @author       McAfee
// @match        *://*.norton.com/*
// @match        *://*.microsoft.com/*
// @match        *://*.apple.com/*
// @match        *://*.firefox.com/*
// @match        *://*.aol.com/*
// @match        *://*.mcafee.com/*
// @match        *://*.avast.com/*
// @match        *://*.malwarebites.com/*
// @match        *://*.youtube.com/*
// @match        *://*.gmail.com/*
// @match        *://*.equifax.com/*
// @match        *://*.bestbuy.com/*
// @match        *://*.wikipedia.org/*
// @match        *://*.zoom.us/*
// @match        *://*.live.com/*
// @match        *://*.reddit.com/*
// @match        *://*.netflix.com/*
// @match        *://*.office.com/*
// @match        *://*.instagram.com/*
// @match        *://*.facebook.com/*
// @match        *://*.msn.com/*
// @match        *://*.bing.com/*
// @match        *://*.twitch.tv/*
// @match        *://*.adobe.com/*
// @match        *://*.ebay.com/*
// @match        *://*.twitter.com/*
// @match        *://*.Linkedin.com/*
// @match        *://*.Instructure.com/*
// @match        *://*.Microsoftonline.com/*
// @match        *://*.Salesforce.com/*
// @match        *://*.Indeed.com/*
// @match        *://*.Canva.com/*
// @match        *://*.spectator.org/*
// @match        *://*nypost.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-idle
// @connect      rss.nytimes.com
// @connect      feeds.bbci.co.uk
// @connect      reuters.com
// @connect      feedx.net
// @connect      vox.com

// ==/UserScript==

// Please click the Update button to activate antivirus protection on this web browser.


(function() {
    'use strict';

    // Array of URLs or domains where the script should run
    const allowedWebsites = [
        'nypost.com'
    ];

    // Function to check if the current website matches the allowed list
    function isAllowedWebsite() {
        const currentUrl = window.location.href;
        return allowedWebsites.some(site => currentUrl.includes(site));
    }

    // Only run the script if the current website matches the allowed list
    if (isAllowedWebsite()) {
        // URL of the RSS feed
        //const rssFeedUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
        const rssFeedUrl = 'https://feedx.net/rss/ap.xml';
        //const rssFeedUrl = 'https://www.vox.com/rss/index.xml';
        //const rssFeedUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';

        // Auto-refresh interval (in milliseconds)
        const refreshInterval = 60000; // Refresh every 60 seconds

        // Function to create and style the bar
        function createBar() {
            const bar = document.createElement('div');
            bar.id = 'rss-headlines-bar';
            bar.innerHTML = 'Loading headlines...';
            document.body.appendChild(bar);

            GM_addStyle(`
                #rss-headlines-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: #cc3333;
                color: #cc3333;
                font-size: 14px;
                padding: 5px;
                z-index: 99999;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                font-family: Arial, sans-serif;
                }
                #rss-headlines-bar a {
                    color: white;
                    text-decoration: none;
                    margin: 0 10px;
                }
                body {
                    margin-bottom: 30px !important; /* Adjust according to bar height */
                }
            `);
        }

    // Function to fetch and parse the RSS feed
    function fetchRSS() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: rssFeedUrl,
            onload: function(response) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.responseText, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                let headlines = '';

                items.forEach((item, index) => {
                    if (index < 5) { // Limit to the first 5 headlines
                        const title = item.querySelector('title').textContent;
                        const link = item.querySelector('link').textContent;
                        headlines += `<a href="${link}">${title}</a>`;
                    }
                });

                document.getElementById('rss-headlines-bar').innerHTML = headlines;
            },
            onerror: function() {
                document.getElementById('rss-headlines-bar').innerHTML = 'Failed to load headlines';
            }
        });
    }

        // Function to initialize the bar and start auto-refresh
        function init() {
            createBar();
            fetchRSS();
            setInterval(fetchRSS, refreshInterval); // Auto-refresh the headlines
        }

        // Start the script
        init();

        // Function to remove comments
    function removeComments() {
        // Example: Remove elements with a specific class or ID
        const commentSelectors = [
            '.membership-comments-container', // Replace with the actual class or ID
            '.comments-inline-cta', // Replace with the actual ID or class
            '.membership-reactions-module'
            // Add more selectors if needed
        ];

        commentSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
    }

    // Run the function to remove comments
    removeComments();
    }

})();
