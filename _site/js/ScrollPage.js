class ScrollPages {
    constructor(totalPageNumber, pages, pageMapParent){
        this.currentPageNumber = 1;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.pageMapParent = pageMapParent;
        this.viewHeight = document.documentElement.clientHeight;
        this.pageDoms = document.getElementsByClassName('page');
        this.textContainers = document.getElementsByClassName('text-container');
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
            deer.walkAnimation();
            this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
            this.currentPageNumber++;
            this.updatePageMap();
            this.textAnimation();
        }
    }
    scrollUp() {
        if (this.currentPageNumber !== 1) {
            this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
            this.currentPageNumber--;
            this.updatePageMap();
            this.textAnimation();
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
    createPageMap() {
        let pageMapContainer = document.createElement('div');
        pageMapContainer.className = 'page-map-container';
        this.pageMapParent.appendChild(pageMapContainer);
        for(let i=0; i < this.totalPageNumber; i++) {
            pageMapContainer.innerHTML += '<p class="page-map hover"><span></span></p>';
        }
        this.pageMap = document.getElementsByClassName('page-map');
        this.setPageMapHeight();
        this.pageMap[0].classList.add('map-active');
        for(let i=0; i<this.totalPageNumber; i++) {
            let e = this.pageMap[i]; 
            e.addEventListener('click', event => {
                this.scrollTo(i+1);
                for(let j=0; j<this.pageMap.length; j++) {
                    this.pageMap[j].classList.remove('map-active');
                }
                e.classList.add('map-active');
            });
        }
    }
    setPageMapHeight() {
        let pageMapParentHeight = parseInt(window.getComputedStyle(this.pageMapParent, null).height);
        for(let i=0; i<this.totalPageNumber; i++) {
            this.pageMap[i].style.height = parseInt(pageMapParentHeight / this.totalPageNumber) + 'px';
        }
    }
    updatePageMap() {
        for(let i=0; i<this.totalPageNumber; i++) {
            this.pageMap[i].classList.remove('map-active');
        }
        this.pageMap[this.currentPageNumber-1].classList.add('map-active');
    }
    resize() {
        this.viewHeight = document.documentElement.clientHeight;
        for (let i=0; i<this.totalPageNumber; i++) {
            this.pageDoms[i].style.height = this.viewHeight + 'px';
        }
        this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
        this.setPageMapHeight();
    }
    textAnimation() {
        for (let j=0; j<this.textContainers.length; j++) {
            this.textContainers[j].classList.remove('in-sight');
        };
        let textContainerInSight = this.textContainers[this.currentPageNumber-1];
        textContainerInSight.classList.add('in-sight');
    }
    init() {
        this.textContainers[0].classList.add('in-sight');
        let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
        let handleResize = helper.debounce(this.resize, 500, this);
        for (let i=0; i<this.totalPageNumber; i++) {
            this.pageDoms[i].style.height = this.viewHeight + 'px';
        }
        this.createPageMap();
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
            if (this.startY - endY < -50) {
                this.scrollUp();
            }
            if (this.startY - endY > 50) {
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
    let allPages = document.getElementById('main-post-list');
    let totalPageNumber = document.getElementsByClassName('page').length;
    let pageMapParent = document.getElementsByTagName('nav')[0];
    mainPostList = new ScrollPages(totalPageNumber, allPages, pageMapParent);
    mainPostList.init();
})
