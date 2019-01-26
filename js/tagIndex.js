class TagNav {
    constructor() {
        this.navBar = document.getElementsByClassName('tag-nav')[0];
        this.tagList = document.getElementsByClassName('tag-post-list')[0];
        this.tagItems = document.getElementsByClassName('tag-post-item');
        this.itemWidth = parseInt(window.getComputedStyle(this.tagItems[0]).width); 
        this.currentTagIndex = 0;
        this.totalTagCounts = this.tagItems.length;
    }
    initItemPosition() {
        for(let i=0; i<this.totalTagCounts; i++) {
            let itemStyle = this.tagItems[i].style;
            itemStyle.left = this.itemWidth * i + 'px';
        }
    }
    scrollLeft() {
        if (this.currentTagIndex !== 0) {
            this.tagList.style.left = this.currentTagIndex * this.itemWidth - this.itemWidth + 'px'; 
            this.currentTagIndex--;
        }
    }
    scrollRight() {
        if (this.currentTagIndex !== 0) {
            this.tagList.style.left = this.currentTagIndex * this.itemWidth - this.itemWidth + 'px'; 
            this.currentTagIndex--;
        }
    }
    init() {
        console.log('init');
        this.initItemPosition();
    }
}

var tagNav = new TagNav();
tagNav.init();
tagNav.scrollRight();
