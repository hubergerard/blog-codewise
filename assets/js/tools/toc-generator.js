const currentScript = document.currentScript;
const MIN_HEADER_LEVEL = 2;
const MAX_HEADER_LEVEL = 4;
const TOC_TITLE = 'Sommaire';
let TEXT_MODE;
$(document).ready(() => {
    TEXT_MODE = currentScript.getAttribute("text-mode");
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
                    innerTocLink.innerText = headerList[j].innerText;
                    innerTocListItem.appendChild(innerTocLink);
                } else if (isTextMode()) {
                    innerTocListItem.innerText = headerList[j].innerText;
                }
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
    appendHeaderListToElement(headers, toc, MIN_HEADER_LEVEL);
}

function isTextMode() {
    return TEXT_MODE === 'true' || TEXT_MODE === '1';
}
