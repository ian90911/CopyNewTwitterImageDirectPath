var clickedElement;

document.addEventListener('contextmenu', function (event) {
    clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.function == "getClickedImage") {
        createPathInput(request.imgUrl);
    }
    sendResponse('');
    return true;
});

function createPathInput(imgUrl) {
    var input = document.createElement('input');
    input.value = imgUrl;
    input.select();
    clickedElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .appendChild(input);
    input.select();
    document.execCommand("Copy", false, null);
}