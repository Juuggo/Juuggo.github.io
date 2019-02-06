class TagNav {
    constructor() {
        this.tagLinks = document.getElementsByClassName('tag-list')[0].getElementsByTagName('a');
        this.itemContainer = document.getElementsByClassName('tag-item-container')[0];
        let tagItems = document.getElementsByClassName('tag-item');
        this.tagItems = Array.prototype.slice.call(tagItems);
        this.itemWidth = parseInt(window.getComputedStyle(this.tagItems[0]).width); 
        this.totalTagCounts = this.tagItems.length;
    }
    initItemPosition() {
        this.itemContainer.style.left = -this.currentItemIndex * this.itemWidth + 'px'; 
        for(let i=0; i<this.totalTagCounts; i++) {
            let itemStyle = this.tagItems[i].style;
            itemStyle.left = this.itemWidth * i + 'px';
        }
    }
    scrollLeft() {
        if (this.currentItemIndex !== this.totalTagCounts - 1) {
            this.itemContainer.style.left = -(this.currentItemIndex+1) * this.itemWidth + 'px'; 
            this.currentItemIndex++;
            deer.stopAllAnimation();
            deer.timeoutId = setTimeout(() => {deer.startPress('right')}, 20);
        }
    }
    scrollRight() {
        if (this.currentItemIndex !== 0) {
            this.itemContainer.style.left = -(this.currentItemIndex-1) * this.itemWidth + 'px'; 
            this.currentItemIndex--;
            deer.stopAllAnimation();
            deer.timeoutId = setTimeout(() => {deer.startPress('left')}, 20);
        }
    }
    getTagIndexByName(tagName) {
        let itemId = 'item-' + tagName;
        let toItem = document.getElementById(itemId);
        let tagIndex = this.tagItems.indexOf(toItem);
        return tagIndex;
    }
    scrollToTag(tagName) {
        let tagIndex = this.getTagIndexByName(tagName);
        while (tagIndex !== this.currentItemIndex) {
            if (tagIndex > this.currentItemIndex) {
                this.scrollLeft();
            } else {
                this.scrollRight();
            }
        }
    }
    resize() {
        this.itemWidth = parseInt(window.getComputedStyle(this.tagItems[0]).width); 
        this.initItemPosition();
    }
    init() {
        let handleResize = helper.debounce(this.resize, 800, this);
        if(window.location.hash) {
            let tagName = window.location.hash.split('#')[1];
            this.currentItemIndex = this.getTagIndexByName(tagName);
        } else {
            this.currentItemIndex = 0;
        }
        this.initItemPosition();
        for(let i=0; i<this.totalTagCounts; i++) {
            let tagName = this.tagLinks[i].innerHTML;
            this.tagLinks[i].addEventListener('click', event => {
                this.scrollToTag(tagName);
            });
        }
        document.addEventListener('touchstart', (event) => {
            this.startX = event.touches[0].pageX;
        });
        document.addEventListener('touchend', (event) => {
            let endX = event.changedTouches[0].pageX;
            if (this.startX - endX < -50) {
                this.scrollRight();
            }
            if (this.startX - endX > 50) {
                this.scrollLeft();
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    tagNav = new TagNav();
    tagNav.init();
})
