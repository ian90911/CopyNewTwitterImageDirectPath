function onMenuItemClickEvent(info, tab) {
    if (info.menuItemId !== "copy-twitter-image-path") {
        return;
    }
    var regex = /https:\/\/pbs\.twimg\.com\/media\/(?<filename>.*)\?format=(?<extension>.*)&name=.*/s;

    if (info.srcUrl !== null && info.srcUrl !== undefined && regex.test(info.srcUrl)) {
        var match = regex.exec(info.srcUrl);
        var path = `https://pbs.twimg.com/media/${match.groups.filename}.${match.groups.extension}`;

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                function: "getClickedImage",
                imgUrl: path
            }, function (response) {
                //do nothing
            });
        });
    } else {
        console.log("copy fail!");
    }
}

function createBubble(path) {
    var bubbleDOM = document.createElement('div');
    bubbleDOM.setAttribute('class', 'twitter-img-path-bubble');
    document.body.appendChild(bubbleDOM);
}

function mycallback(info, tab) {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", function (clickedEl) {
        elt.value = clickedEl.value;
    });
}

chrome.contextMenus.create({
    "id": "copy-twitter-image-path",
    "title": "CopyTwitterImagePath",
    "contexts": ["image"],
    "documentUrlPatterns": ["https://twitter.com/*"]
});

chrome.contextMenus.onClicked.addListener(onMenuItemClickEvent);