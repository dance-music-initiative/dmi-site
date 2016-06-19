// require main styles
require('../less/index.less');

let elements = null;
let anchors = {};

window.addEventListener('load', function () {
    elements = document.getElementsByClassName('section-image');

    for (let i = 0; i < elements.length; ++i) {
        const e = elements[i];
        anchors[e.dataset.anchor] = document.getElementById(e.dataset.anchor);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
});

function onScroll() {
    const scrollTop = document.body.scrollTop;

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

    return {
        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
        width: box.width,
        height: box.height,
    };
}
