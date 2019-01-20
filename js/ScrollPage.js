class ScrollPages {
    constructor(totalPageNumber, pages){
        this.currentPageNumber = 1;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.viewHeight = document.documentElement.clientHeight;
        this.pageDoms = document.getElementsByClassName('page');
    }
    mouseScroll(event) {
        let delta = helper.getDelta(event);
        if (delta < 0) {
            this.scrollDown();
        } else {
            this.scrollUp();
        }
    }
    scrollDown() {
        if (this.currentPageNumber !== this.totalPageNumber){
            this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
            this.currentPageNumber++;
            this.textFadeInOut();
        }
    }
    scrollUp() {
        if (this.currentPageNumber !== 1) {
            this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
            this.currentPageNumber--;
            this.textFadeInOut();
        }
    }
    scrollTo(targetPageNumber) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                this.scrollUp();
            } else {
                this.scrollDown();
            }
        }
    }
    resize() {
        this.viewHeight = document.documentElement.clientHeight;
        for (let i=0; i<this.totalPageNumber; i++) {
            this.pageDoms[i].style.height = this.viewHeight + 'px';
        }
        this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
    }
    textFadeInOut() {
        const containersDom = document.getElementsByClassName('text-container');
        let textContainers = Array.prototype.slice.call(containersDom);
        textContainers.forEach((e) => {
            e.classList.remove('in-sight');
        });
        let textContainerInSight = textContainers[this.currentPageNumber-1];
        textContainerInSight.classList.add('in-sight')
    }
    init() {
        let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
        let handleResize = helper.debounce(this.resize, 500, this);
        for (let i=0; i<this.totalPageNumber; i++) {
            this.pageDoms[i].style.height = this.viewHeight + 'px';
        }
        this.textFadeInOut();
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('wheel', handleMouseWheel);
        } else {
            document.addEventListener('DOMMouseScroll', handleMouseWheel);
        }
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.scrollUp();
            }
            if (this.startY - endY > 0) {
                this.scrollDown();
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let allPages = document.getElementById('all-pages');
    let totalPageNumber = document.getElementsByClassName('page').length;
    console.log(totalPageNumber);
    mainPostList = new ScrollPages(totalPageNumber, allPages);
    mainPostList.init();
})
