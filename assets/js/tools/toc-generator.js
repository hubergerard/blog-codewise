const currentScript = document.currentScript;
const MIN_HEADER_LEVEL = 2;
const TOC_TITLE = 'Sommaire';
let MAX_HEADER_LEVEL = 4;
let TEXT_MODE = false;
let titleNumbers;

$(document).ready(() => {
    const maxDepth = currentScript.getAttribute("max-depth");
    MAX_HEADER_LEVEL = maxDepth === '' ? 4 : maxDepth;
    TEXT_MODE = currentScript.getAttribute("text-mode");
    console.log(maxDepth);
    generateTableOfContent();
})

function appendHeaderListToElement(headerList, element, headerLevel) {
    if (headerLevel > MAX_HEADER_LEVEL || headerList.length === 0) return;

    if (headerList.length) {
        const tocInnerList = document.createElement("ul");
        for (let j = 0; j < headerList.length; j++) {
            
            const anchor = headerList[j].previousElementSibling;
            if (anchor && (anchor.getAttribute("class") == 'anchor' || isTextMode())) {
                let innerTocListItem = document.createElement("li");
                if (anchor.getAttribute("class") == 'anchor') {
                    const id = anchor.getAttribute("id");
                    headerList[j].previousElementSibling.id = id;
                    const innerTocLink = document.createElement("a");
                    innerTocLink.setAttribute("href", "#" + id);
                    innerTocLink.innerText = `${titleNumbers.depth1}.${titleNumbers.depth2}.${titleNumbers.depth3} - ${headerList[j].innerText}`;
                    innerTocListItem.appendChild(innerTocLink);
                } else if (isTextMode()) {
                    innerTocListItem.innerText = `${titleNumbers.depth1}.${titleNumbers.depth2}.${titleNumbers.depth3} - ${headerList[j].innerText}`;
                }
                incrementTitleNumbers(headerLevel);
                tocInnerList.appendChild(innerTocListItem);
                const innerHeaders = $(headerList[j]).nextUntil('h' + headerLevel, 'h' + (headerLevel + 1));
                appendHeaderListToElement(innerHeaders, innerTocListItem, headerLevel + 1);
            }
        }
        element.appendChild(tocInnerList);
    }
}

function generateTableOfContent() {
    const toc = document.getElementById("toc");
    const tocHeader = document.createElement("h2");
    tocHeader.innerText = TOC_TITLE;
    toc.appendChild(tocHeader);
    const headers = document.getElementsByTagName("h2");
    titleNumbers = {
        depth1: 1,
        depth2: 1,
        depth3: 1,
    }
    appendHeaderListToElement(headers, toc, MIN_HEADER_LEVEL);
}

function isTextMode() {
    return TEXT_MODE === 'true' || TEXT_MODE === '1';
}

function incrementTitleNumbers(headerLevel) {
    switch (headerLevel) {
        case 2:
            titleNumbers.depth1++;
            break;
        case 3:
            titleNumbers.depth2++;
            break;
        case 4: 
            titleNumbers.depth3++;
    }
}

function resetTitleNumbers(headerLevel) {
    if (headerLevel == 2) {
        titleNumbers.depth2 = 1;
        titleNumbers.depth3 = 1;
    }
    if (headerLevel == 3) {
        titleNumbers.depth3 = 1;
    }
}
