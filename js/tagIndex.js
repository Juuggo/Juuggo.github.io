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
        console.log('start init postion, index:' + this.currentItemIndex);
        this.itemContainer.style.left = -this.currentItemIndex * this.itemWidth + 'px'; 
        console.log(this.itemContainer.style.left);
        console.log('end init postion, index:' + this.currentItemIndex);
        for(let i=0; i<this.totalTagCounts; i++) {
            let itemStyle = this.tagItems[i].style;
            itemStyle.left = this.itemWidth * i + 'px';
        }
    }
    scrollLeft() {
        if (this.currentItemIndex !== this.totalTagCounts - 1) {
            this.itemContainer.style.left = -(this.currentItemIndex+1) * this.itemWidth + 'px'; 
            this.currentItemIndex++;
        }
    }
    scrollRight() {
        if (this.currentItemIndex !== 0) {
            this.itemContainer.style.left = -(this.currentItemIndex-1) * this.itemWidth + 'px'; 
            this.currentItemIndex--;
        }
    }
    getTagIndexByName(tagName) {
        let toItem = document.getElementById(tagName);
        let tagIndex = this.tagItems.indexOf(toItem);
        return tagIndex;
    }
    scrollToTag(tagName) {
        let tagIndex = this.getTagIndexByName(tagName);
        console.log(this.itemWidth);
        while (tagIndex !== this.currentItemIndex) {
            console.log('to: ' + tagIndex);
            console.log('current: ' + this.currentItemIndex);
            if (tagIndex > this.currentItemIndex) {
                this.scrollLeft();
            } else {
                this.scrollRight();
            }
            console.log('afterscroll,to: ' + tagIndex);
            console.log('afterscroll,current: ' + this.currentItemIndex);
        }
        window.location.hash = 'tag-' + tagName;
    }
    init() {
        console.log('init: ', this.itemContainer.style.left);
        if(window.location.hash) {
            let tagName = window.location.hash.split('#')[1];
            console.log(tagName);
            this.currentItemIndex = this.getTagIndexByName(tagName);
        } else {
            this.currentItemIndex = 0;
        }
        this.initItemPosition();
        console.log('init currentItemIndex: ' + this.currentItemIndex);
        for(let i=0; i<this.totalTagCounts; i++) {
            let tagName = this.tagLinks[i].innerHTML;
            this.tagLinks[i].addEventListener('click', event => {
                this.scrollToTag(tagName);
            });
        }
    }
}

var tagNav = new TagNav();
tagNav.init();
