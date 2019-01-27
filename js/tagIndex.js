class TagNav {
    constructor() {
        this.navBar = document.getElementsByClassName('tag-nav')[0];
        this.tagList = document.getElementsByClassName('tag-post-list')[0];
        this.tagItems = document.getElementsByClassName('tag-post-item');
        this.itemWidth = parseInt(window.getComputedStyle(this.tagItems[0]).width); 
        this.currentItemIndex = 0;
        this.totalTagCounts = this.tagItems.length;
    }
    initItemPosition() {
        for(let i=0; i<this.totalTagCounts; i++) {
            let itemStyle = this.tagItems[i].style;
            itemStyle.left = this.itemWidth * i + 'px';
        }
    }
    scrollLeft() {
        if (this.currentItemIndex !== this.totalTagCounts - 1) {
            this.tagList.style.left = -(this.currentItemIndex+1) * this.itemWidth + 'px'; 
            this.currentItemIndex++;
        }
    }
    scrollRight() {
        if (this.currentItemIndex !== 0) {
            this.tagList.style.left = -(this.currentItemIndex-1) * this.itemWidth + 'px'; 
            this.currentItemIndex--;
        }
    }
    scrollToTag(toTagName) {
        let currentItem = this.tagList[this.currentItemIndex];
        let currentTag = currentItem.getAttribute('id').split('-')[1];
        console.log(currentTag);
        if (currentTag !== toTagName) {

        }
    }
    init() {
        console.log('init');
        this.tagList.style.left = '0px'; 
        this.initItemPosition();
    }
}

var tagNav = new TagNav();
tagNav.init();
