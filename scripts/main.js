var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var HIDDEN_DETAIL_CLASS = 'hidden-detail';

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title')
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

/**
 * 从 thumb 上获得信息送到 detail 上显示
 * 在显示的过程当中使用一些小花招(图片瞬间变小,50毫秒之后再变大)
 * @param thumb
 */
function addThumbClickHandler(thumb) {
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        // 从 thumb 上获得信息送到 detail 上显示
        setDetailsFromThumb(thumb);
        // 在显示的过程当中使用一些小花招(图片瞬间变小,50毫秒之后再变大)
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

/**
 * 把图片瞬间变小,50毫秒之后,再变大
 */
function showDetails() {
    'use strict';
    //document.body.classList.remove(HIDDEN_DETAIL_CLASS);

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    // 把 hidden-detail 从 body 标签上移除
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    // 在 detail frame 上添加 is-tiny 类 ,is-tiny 类是一个 transform(把图片瞬间变小)
    frame.classList.add(TINY_EFFECT_CLASS);
    // 在50毫秒之后,把图片变大
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}
/**
 * 按下esc键之后,在 body 标签上添加 hidden-detail 类
 * 这样就没有 detail 了,只剩 thumbnail-list 当中的内容了
 */
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

/**
 * 获得所有的 Thumbnail 并给它们添加点击事件
 * 并且添加按下 Esc 键的事件
 */
function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);

    addKeyPressHandler();
}

initializeEvents();
