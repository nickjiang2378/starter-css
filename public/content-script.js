/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/* Executes within the context of the browser */

const observer = new MutationObserver(function(mutations) {
    for (let mutation of mutations) {
        if (mutation.type === "attributes") {
            //console.log(mutation.target);
            sendElementStyles(mutation.target);
            break;
        }
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting === "hello") {
            try {
                let elementAttributes = getElementAttributes($0);
                sendResponse(elementAttributes);
            } catch (e) {
                sendResponse({});
            }
        }
    }
);

function updateElement(element, changes) {
    let computedStyles = window.getComputedStyle(element);
    Object.keys(changes).forEach((key) => {
        if (computedStyles[key] !== changes[key]) {
            //console.log(`New val of ${key}: ${changes[key]}`);
            element.style[key] = changes[key];
        }
    })
}

function updateSelectedElement(changes) {
    /* Updates the style attributes of the selected element */
    if ($0) {
        updateElement($0, changes);
    }
}

function makeStyleChanges(changes) {
    /* Updates the style attributes of the selected element, the containing block, and the child elements */
    //console.log(`Received changes: ${JSON.stringify(changes)}`)
    //let containingBlock = getContainingBlock(element);
    let containingBlock = null;
    let selectedElement = $0;
    //console.log(selectedElement);
    if (selectedElement) {
        updateElement(selectedElement, changes?.selectedElementChanges)
        let childElements = selectedElement.children;
        if (changes?.childElementChanges && childElements) {
            let i = 0;
            let j = 0;
            while (i < changes?.childElementChanges.length && j < childElements.length) {
                updateElement(childElements[i], changes?.childElementChanges[j])
                i++;
                j++;
            }
        }
    }
    if (containingBlock) {
        updateElement(containingBlock, changes?.containingBlockChanges)
    }
}

function sendElementStyles(element) {
    /* Sends the current selected element's attributes to the extension through Chrome runtime */
    console.log(`Request initiated for selected element ${element}}`);
    let elementAttributes = getElementAttributes(element);
    chrome.runtime.sendMessage(elementAttributes, (response) => {
        console.log(`Response received`);
    });
}

function getElementAttributes(element) {
    let containingBlock = getContainingBlock(element);
    let childElements = []
    let i = 0;
    for (let child of element.children) {
        childElements.push(summarizeElement(child))
        i += 1;
    }
    return {
        "selectedElement": summarizeElement(element),
        "childElements": childElements,
        "containingElement": summarizeElement(containingBlock)
    }
}

function listenForAttributeChanges(observer, element) {
    observer.disconnect();
    observer.observe(element, { attributes : true, attributeFilter : ['style', 'class'] }); 
}

function getContainingBlock(element) {
    // taken from popper.js
    function getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
        return [];
        }
        // NOTE: 1 DOM access here
        const window = element.ownerDocument.defaultView;
        const css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }

    // Relevant for static, relative, and sticky positioning
    function testFormattingContext(element) {
        let displayVal = getStyleComputedProperty(element, 'display')
        if (['block', 'inline-block', 'flex', 'grid'].indexOf(displayVal) !== -1) {
            return true;
        }
        return false;
    }

    // Relevant for ONLY absolute
    function testAbsolute(element) {
        let position = getStyleComputedProperty(element, 'position')
        if (position !== 'static') {
            return true;
        } else {
            return testAbsoluteFixed(element);
        }
    }

    // Relevant for BOTH absolute and fixed
    function testAbsoluteFixed(node) {
        let test; let cs = getComputedStyle(node);
        test = cs.getPropertyValue('transform');   if (test !== 'none')  { return true; }
        test = cs.getPropertyValue('perspective'); if (test !== 'none')  { return true; }
        test = cs.getPropertyValue('filter');      if (test !== 'none')  { return true; }
        test = cs.getPropertyValue('contain');     if (test === 'paint') { return true; }
        test = cs.getPropertyValue('will-change'); if ([
            'transform', 'perspective', 'filter'
        ].includes(test)) { return true; }
        test = cs.getPropertyValue('backdrop-filter'); if (test !== 'none') { return true; }
        return false;
    }

    let position = getStyleComputedProperty(element, 'position');
    while ((element = element.parentElement)) {
        if (['static', 'relative', 'sticky'].includes(position) && testFormattingContext(element)) {
            break;
        } else if (position === 'absolute' && testAbsolute(element)) {
            break;
        } else if (position === 'fixed' && testAbsoluteFixed(element)) {
            break;
        }
    }
    if (element) {
        return element;
    } else {
        return null;
    }
}

function summarizeElement(element) {
    try {
        return {
            elementType: element?.nodeName,
            inlineStyles: element?.style,
            computedStyles: window.getComputedStyle(element)
        }
    } catch (e) {
        console.log(`Error with summarizing element: ${e}`)
        return {
            elementType: "ERROR",
            inlineStyles: {},
            computedStyles: {}
        }
    }
}