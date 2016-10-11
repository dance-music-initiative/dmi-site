'use strict';

// require main styles
require('../less/index.less');

let elements = null;
const anchors = {};

window.addEventListener('load', function onloadHandler() {
    elements = document.getElementsByClassName('section-image');

    for (let i = 0; i < elements.length; ++i) {
        const e = elements[i];

        anchors[e.dataset.anchor] = document.getElementById(e.dataset.anchor);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
});

function onScroll() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    for (let i = 0; i < elements.length; ++i) {
        const elm = elements[i];
        const anchor = anchors[elm.dataset.anchor];

        const elmRect = rect(elm);
        const anchorRect = rect(anchor);

        if (scrollTop >= anchorRect.top) {
            elm.classList.add('stick');
            anchor.style.height = elmRect.height + 'px';
        }
        else {
            elm.classList.remove('stick');
            anchor.style.height = 0;
        }
    }
}

function rect(elm) {
    const box = elm.getBoundingClientRect();
    const win = window;
    const docElem = document.documentElement;
    const style = elm.currentStyle || window.getComputedStyle(elm);

    return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
        width: box.width + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10),
        height: box.height + parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10),
    };
}
