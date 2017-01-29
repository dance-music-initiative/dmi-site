'use strict';

// require main styles
require('../less/index.less');

// require polyfills
require('./raf');

// main requires
const domready = require('domready');

// some globals
let contactElement = null;
let scrollIndicator = null;
let contactFadedIn = false;
const CONTACT_FADE_HEIGHT_FACTOR = 0.25;
const SCROLL_ANIM_INTERVAL_MS = 10;
const SCROLL_ANIM_TIME_MS = 1000;
const elements = [];

domready(function domReadyHandler() {
    const sections = document.getElementsByClassName('section-image');

    scrollIndicator = document.getElementById('scrolling-indicator');

    // lets gather our elements
    for (let i = 0; i < sections.length; ++i) {
        const section = sections[i];

        elements.push(
            {
                section,
                sectionRect: null,
                anchor: document.getElementById(section.dataset.anchor),
                anchorRect: null,
                stuck: false,
            }
        );

        if (section.id === 'contact-section') {
            contactElement = elements[elements.length - 1];
        }
    }

    scrollIndicator.addEventListener('click', function onScrollClick(e) {
        e.preventDefault();
        scrollTo(contactElement.anchorRect.top, SCROLL_ANIM_TIME_MS);
    }, false);

    window.addEventListener('resize', onResize, false);

    onResize(); // setup rects
    onRender(); // start render loop
});

function onRender() {
    requestAnimationFrame(onRender);

    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    for (let i = 0; i < elements.length; ++i) {
        const element = elements[i];

        if (scrollTop >= element.anchorRect.top) {
            if (!element.stuck) {
                element.stuck = true;
                element.section.classList.add('stick');
                element.anchor.style.height = element.sectionRect.height + 'px';
            }
        }
        else if (element.stuck) {
            element.stuck = false;
            element.section.classList.remove('stick');
            element.anchor.style.height = '0px';
        }
    }

    if (!contactFadedIn) {
        const scrollBottom = scrollTop + (window.innerHeight || document.documentElement.clientHeight);
        const fadeStart = contactElement.anchorRect.top + (contactElement.sectionRect.height * CONTACT_FADE_HEIGHT_FACTOR);

        if (scrollBottom >= fadeStart) {
            contactFadedIn = true;
            contactElement.section.children[0].classList.remove('hide');
            contactElement.section.children[0].classList.add('fadeIn');
        }
    }
}

function onResize() {
    // cache the rects for these items on resize.
    for (let i = 0; i < elements.length; ++i) {
        const element = elements[i];

        element.sectionRect = rect(element.section);
        element.anchorRect = rect(element.anchor);

        // resize anchors if necessary
        if (element.anchor.style.height && element.anchor.style.height !== '0px') {
            element.anchor.style.height = element.sectionRect.height + 'px';
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

function scrollTo(to, duration) {
    if (duration <= 0) {
        return;
    }

    const body = document.body;
    const difference = to - body.scrollTop;
    const perTick = (difference / duration) * 10; // eslint-disable-line no-magic-numbers

    setTimeout(function _scrollToTick() {
        body.scrollTop = (body.scrollTop || document.documentElement.scrollTop) + perTick;

        if (body.scrollTop === to) {
            return;
        }

        scrollTo(to, duration - SCROLL_ANIM_INTERVAL_MS);
    }, SCROLL_ANIM_INTERVAL_MS);
}
