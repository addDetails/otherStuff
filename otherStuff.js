// ==UserScript==
// @name         AdBlocker
// @namespace    https://github.com/addDetails/html
// @version      0.0.3
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

    // Function to remove all video elements with both classes
    function removeVideos() {
        const videos = document.querySelectorAll('.jw-float-bar.jw-reset');
        videos.forEach(video => video.remove());
    }

    // Remove videos immediately when the script runs
    removeVideos();

            // Optionally: observe the document for dynamically added video elements and remove them as they appear
    const observer = new MutationObserver(() => {
        removeVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });


        // Function to insert picture
    function insertPicture() {
            // List of image URLs you want to display
    const imageUrls = [
        "https://media.barchart.com/contributors-admin/common-images/images/Famous%20People/Image%20of%20Founder%20Elon%20Musk%20by%20Frederic%20Legrand%20-%20COMEO%20via%20Shutterstock.jpg",
        "https://www.carbontrack.co.uk/wp-content/uploads/2025/02/Elon-Musk-Net-Worth.png",
        "https://media.cooltechzone.com/images/750w/2024/06/elon-musk-portrait.jpg",
        "https://d.newsweek.com/en/full/2586866/elon-musk.jpg",
        "https://www.indy100.com/media-library/elon-musk-wants-to-buy-openai-for-close-to-100b-backed-by.jpg?id=56406780&width=1200&height=600&coordinates=0%2C119%2C0%2C358",
        "https://altiusinvestech.com/blog/wp-content/uploads/2025/02/HD-wallpaper-celebrity-elon-musk.jpg",
        "https://247wallst.com/wp-content/uploads/2020/06/imageForEntry1-f4R.jpg",
        "https://www.indy100.com/media-library/local-meteorologist-fired-after-accusing-elon-musk-of-giving-nazi-salute.jpg?id=55985586&width=1200&height=600&coordinates=0%2C60%2C0%2C60",
        "https://en.shiftdelete.net/wp-content/uploads/2025/02/can-elon-musk-access-nuclear-weapons.webp",
        "https://newscentral.africa/wp-content/uploads/Elon-Musk-Leads-100-Billion-Offer-to-Buy-ChatGPTs-Parent-Company.webp",
        "https://api.time.com/wp-content/uploads/2025/02/elon-musk-trump-government-tesla.jpg",
        "https://cherry.img.pmdstatic.net/fit/https.3A.2F.2Fimg.2Eohmymag.2Eco.2Euk.2Fs3.2Fukomm.2F1280.2Fusa.2Fdefault_2025-02-10_e12774f9-dd23-4648-ac6d-bc4889098661.2Ejpeg/1200x675/quality/80/elon-musk-s-dating-history.jpg",
        "https://malaysiagazette.com/wp-content/uploads/2023/02/Elon-Musk-681x591.jpeg",
        "https://i2-prod.irishstar.com/news/us-news/article34651082.ece/ALTERNATES/s1200/0_Elon-Musk-at-the-Inauguration-Of-Donald-Trump.jpg",
        "https://cdn.siasat.com/wp-content/uploads/2025/02/Time-Magazine-shows-Elon-Musk-in-presidential-chair-Donald-Trump-reacts.jpg",
        "https://files.merca20.com/uploads/2024/12/Elon-Musk-net-worth-this-is-the-value-of-his-shares-according-to-Bloomberg-.jpg",
        "https://www.transports-express-caraibes.fr/blog/wp-content/uploads/2025/02/elon-musk-kekius-maximus-1024x683.jpg",
        "https://cdn.wccftech.com/wp-content/uploads/2025/02/Elon-Musk-OpenAI.jpeg",
        "https://cdn.unotv.com/images/2024/12/elon-musk-fortuna-mas-grande-400-mil-millones-160141.jpg",
        "https://www.indy100.com/media-library/elon-musk-salutes-during-trump-inauguration-speech.jpg?id=55847550&width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C0",
        "https://www.01net.com/app/uploads/2023/08/elon-musk-paris-2023-1.jpg",
        "https://cdn.unotv.com/images/2025/02/juez-bloqueo-elon-musk-101541.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
        "https://images.handelsblatt.com/VUVcBvzb9QIq/cover/1400/934/0/0/0/0/0.5/0.5/archiv-13112024-usa-washington-elon-musk-tech-milliardaer-und-besitzer-von-tesla-und-x-h.jpeg",
        "https://cdn.colombia.com/sdi/2025/02/13/elon-musk-denuncia-que-se-pagaron-hoteles-de-lujo-para-indocumentados-en-new-york-1272759.jpg",
        "https://ares.shiftdelete.net/2025/01/elon-musk-yapay-zeka-bilgi-kaynak-kapak.webp",
        "http://cdn.wccftech.com/wp-content/uploads/2016/09/elon-musk.jpeg",
        "https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg",
        "https://www.lr21.com.uy/wp-content/uploads/2025/02/Elon-Musk-Machine-Learning-best-lvl-AI.jpg",
        "http://static1.businessinsider.com/image/57daed95b0ef97b3088b5f74-846/elon%20musk-1.jpg",
        "https://cdn.britannica.com/54/188754-050-A3613741/Elon-Musk-2010.jpg",
        "https://album.mediaset.es/eimg/2025/02/10/el-multimillonario-elon-musk_9c94.jpg?w=800",
        "https://www.articulo14.es/main-files/uploads/2025/02/elon-musk-chatgpt.jpg",
        "https://movieplayer.net-cdn.it/t/images/2025/02/12/elon-musk_jpg_1200x0_crop_q85.jpg",
        "http://static6.businessinsider.com/image/56055b87dd0895cb7b8b4645-2400/elon-musk-387.jpg",
        "https://people.com/thmb/63vkoIr01KJocMw-Eanou_lOCHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x39:721x41)/Elon-Musk-5b33223ae173454382ea3cc04373e8b8.jpg",
        "https://www.cinemascomics.com/wp-content/uploads/2025/02/piramide-marte-elon-musk-960x582.jpg",
        "https://peaklife.in/wp-content/uploads/2019/06/elon-musk-image.jpg",
        "https://i0.wp.com/nypost.com/wp-content/uploads/sites/2/2021/02/elon-musk-1.jpg?quality=90&strip=all&ssl=1",
        "https://www.businessinsider.de/wp-content/uploads/2019/06/elon-musk.jpg",
        "https://cms.qz.com/wp-content/uploads/2017/06/rtr3fy5u.jpg?quality=75&strip=all&w=1200&h=630&crop=1",
        "http://upload.wikimedia.org/wikipedia/commons/1/17/Elon_Musk.jpg",
        "https://hls.harvard.edu/wp-content/uploads/2023/02/Elon-Musk-trial-GettyImages-1459166551-2400-1500x1000.jpg",
        "https://i.insider.com/5fecb76fa644880018193da1?format=jpeg",
        "https://pepnewz.com/wp-content/uploads/rtx3c49k-e1503288228255.jpg",
        "https://cdn-images-1.medium.com/max/1600/1*JmEUqbxA9nA3pr1yMwloOg.jpeg",
        "https://www.businessinsider.in/photo/45235631/what-steve-jobs-elon-musk-and-11-other-tech-visionaries-were-like-in-college/elon-musk-university-of-pennsylvania.jpg",
        "https://image.demorgen.be/253214502/width/2480/elon-musk",
        "https://media.news.de/images/858009533/images/42/df/597eafe0ead481d369593eee1e19/nopic/no_pic/1200/675/1/1/-/4/1024/576/-/-/elon-musk-ceo-tesla-spacex-wahlkampfveranstaltung-archivbild_858009533_1200x675_fa7de0846228d8569b8b735fa6ddf5fa.jpg",
        "http://cdn.wccftech.com/wp-content/uploads/2017/09/Elon-Musk.jpg",
        "https://media.news.de/images/858034481/images/42/e9/d852d3c99499f9befe29821d8711/nopic/no_pic/1200/675/1/1/26/51/981/551/-/-/elon-musk-bild-weissen-haus-fuer-wirbel_858034481_1200x675_fc8ac15a7f1e28388ad0c90303d7368a.jpg",
        "http://static1.businessinsider.com/image/53f769c6ecad04d30d35ca4b-1148-861/elon-musk-133.jpg",
        "https://static01.nyt.com/images/2022/10/29/opinion/27nasaw1/27nasaw1-videoSixteenByNine3000.jpg",
        "http://www.thedetroitbureau.com/wp-content/uploads/2018/05/Elon-Musk-on-TED.jpg",
        "https://mediaproxy.snopes.com/width/1200/https://media.snopes.com/2023/09/elon_musk_sept_2023.jpg",
        "http://static1.businessinsider.com/image/5ab92326821646d7378b46e3-1781/56046ac3dd08958f038b45db.jpg",
        "https://legacy.crikey.com.au/wp-content/uploads/2022/04/Elon-Musk.jpg?quality=70&w=740&h=400&crop=1",
        "http://wallsdesk.com/wp-content/uploads/2017/01/Elon-Musk-HD-Background-.jpg",
        "https://cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/WIZNC6QN6EZ5VRHPG23VGFRTY4.jpg",
        "http://media.gq.com/photos/5669a06a22c04e90668103e4/16:9/pass/elon-musk-gq-1215-01.jpg",
        "https://static3.businessinsider.com/image/5b54619877bc2820008b4581-2000/elon-musk.jpg",
        "https://assets.telegraphindia.com/telegraph/2024/Aug/1723459829_reuters-elon-musk.jpg",
        "https://static6.businessinsider.com/image/5bb2761198a180075011573b-2400/ap18165742620191.jpg",
        "https://www.thefamouspeople.com/profiles/images/elon-musk-8.jpg",
        "http://www.canyon-news.com/wp-content/uploads/2017/05/Elon-Musk.jpg",
        "http://www.slate.com/content/dam/slate/articles/business/the_juice/2016/05/160505_JUICE_elon-musk-economy.jpg.CROP.promo-xlarge2.jpg",
        "https://d.newsweek.com/en/full/1962972/spacex-owner-tesla-ceo-elon-musk.jpg",
        "https://astrologyking.com/wp-content/uploads/elon-musk.jpg",
        "https://media.newyorker.com/photos/64c03754ada160419b41fc93/master/pass/Elon-X-Company.jpg",
        "https://techstory.in/wp-content/uploads/2020/10/elon-musk-image-1024x768.jpg",
        "http://d3i3l3kraiqpym.cloudfront.net/wp-content/uploads/2015/09/12004110/Elon-musk-mars-.jpg",
        "https://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/elon-musk-1000686.jpg",
        "https://pagesix.com/wp-content/uploads/sites/3/2022/07/elon-musk-63.jpg?quality=75&strip=all&w=1024",
        "https://www.eatthis.com/wp-content/uploads/sites/4/2022/10/elon-musk.jpg?quality=82&strip=all",
        "https://images.nightcafe.studio/jobs/c0GiKhEsRWwoBnSTii0h/c0GiKhEsRWwoBnSTii0h--1--e5pd5.jpg?tr=w-1600,c-at_max",
        "https://pagesix.com/wp-content/uploads/sites/3/2022/07/elon-musk-62.jpg",
        "https://nypost.com/wp-content/uploads/sites/2/2022/07/elon-musk-shirtless-mykonos-05.jpg?quality=75&strip=all",
        "https://images.playground.com/e1de5587f9664765a07366a3dbfd6e63.jpeg",
        "https://cdn.openart.ai/stable_diffusion/3dcb1cc9ce783fed0ce78698684ca8fade4061e1_2000x2000.webp",
        "https://www.teslarati.com/wp-content/uploads/2024/10/Elon_Musk_-_March_28_2024.jpg",
        "https://64.media.tumblr.com/1bca4b62c6e2ab7149946f54c9defb40/7af746e13b132731-07/s640x960/24ff50571d287871029c4c945908874280ae0346.jpg",
        "https://media.vogue.co.uk/photos/636cd583251fea594fdf13bd/master/pass/GettyImages-1438059560.jpg",
        "https://images.news18.com/ibnlive/uploads/2021/05/1620325623_untitled-design-47.png",
        "https://i.pinimg.com/736x/ec/06/a4/ec06a437097d2a8e4d15473951105004.jpg",
        "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/08/05/65e2cca3-81d0-40db-bd00-1a338f4763ef_43defb92.jpg",
        "https://pics.craiyon.com/2023-10-09/41ede612a4c742639f42f306739ad29c.webp",
        "https://cdnphoto.dantri.com.vn/aGPZ7w2r0b7QTdCNTXUKqdaZcKo=/thumb_w/1020/2023/11/09/elon-musknypost-2-1699495828096.jpg",
        "https://live.staticflickr.com/7564/26780147923_908e51ddcd_b.jpg",
        "https://cdn.vox-cdn.com/thumbor/rhzUedPdxdv0NexcFXpjgYas4p0=/0x0:4000x2667/1200x800/filters:focal(2362x643:3002x1283)/cdn.vox-cdn.com/uploads/chorus_image/image/72617488/1258889024.0.jpg",
        "https://i.ebayimg.com/images/g/OIYAAOSw3SdeVWuy/s-l1600.jpg",
        "https://static.independent.co.uk/2020/12/03/02/GettyImages-1228322681.jpg",
        "https://d.newsweek.com/en/full/1946447/elon-musk.jpg?w=790&f=e4b3c5a09d958273990a7e9838b140b8",
        "https://drhairstyle.com/wp-content/uploads/2022/02/6-20.png",
        "https://eo54oy2xq6y.exactdn.com/wp-content/uploads/2023/04/Elon-Musk-Haircut-4-.jpg?strip=all&lossy=1&ssl=1",
        "https://i.dailymail.co.uk/1s/2021/12/02/21/51260921-10269285-Musk_s_new_do_was_on_full_display_in_Miami-m-36_1638480617125.jpg",
        "https://cdn.cnn.com/cnnnext/dam/assets/210107120929-elon-musk-mclaren-f1-1999-vault-super-169.jpg",
        "https://startupnews.fyi/wp-content/uploads/2025/02/STK022_ELON_MUSK_CVIRGINIA_F-1068x558.jpg",
        "https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2025/02/p-1-OpenAI-receives-unasked-for-bid-from-Elon-Musk-led-investor-group-for-its-non-profit-assets.jpg",
        "https://cdn.fusionchat.ai/blog/chatgpt/elon-musk-leads-an-offer-to-buy-chatgpt-s-parent-company-for-----t1z0pirn9a951v2cp33g2m.png",
        "https://media.gettyimages.com/id/476317939/photo/2014-vanity-fair-oscar-party-hosted-by-graydon-carter-inside.jpg?s=2048x2048&w=gi&k=20&c=FCLhE2J0Qb3sTdAdJNY1ljedK5DfHpwqorkOHwEqziE="
    ];

 // Select one random image from the array
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const selectedImageUrl = imageUrls[randomIndex];

    // Create a container for the image
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.padding = '10px';
    container.style.backgroundColor = '#f0f0f0';
    container.style.borderBottom = '1px solid #ccc';

    // Create the image element for the selected image
    const img = document.createElement('img');
    img.src = selectedImageUrl;
    // img.style.height = '100px';  // Adjust height as needed

    // Append the image to the container
    container.appendChild(img);

    // Try to insert the container into the div with id="content"
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        contentDiv.insertBefore(container, contentDiv.firstChild);
    } else {
        console.warn('Element with id "content" not found. Inserting container at the top of the body instead.');
        document.body.insertBefore(container, document.body.firstChild);
    }
    }

    // Run the function to remove comments
    insertPicture();


        
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
