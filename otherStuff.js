// ==UserScript==
// @name         Malwarebytes
// @namespace    Malwarebytes.com
// @run-at document-start
// @version      0.1
// @description  Checks for malware on websites
// @author       Malwarebytes.com
// @match        *://*.newsmax.com/*
// @match        *://*.oann.com/*
// @grant        none
// ==/UserScript==

window.stop();
document.documentElement.innerHTML="<h1>Error 404: Page Not Found</h1><p>Sorry, but the page you were trying to view does not exist.</p>";
