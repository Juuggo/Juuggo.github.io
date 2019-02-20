document.addEventListener("DOMContentLoaded", function() {
    // disable hover style on touch devices.
    document.addEventListener('touchstart', function(){
        let domsWithHover = document.getElementsByClassName('hover');
        for(let i = 0; i < domsWithHover.length; i++) {
            domsWithHover[i].classList.remove('hover');
        }
    })

    function initMainPostList() {
        let allPages = document.getElementById('main-post-list');
        let totalPageNumber = document.getElementsByClassName('page').length;
        let pageMapParent = document.getElementsByTagName('nav')[0];
        mainPostList = new ScrollPages(totalPageNumber, allPages, pageMapParent);
        mainPostList.init();
    }

    // welcome page behaviour
    if (window.location.pathname === "/") {
        let enterBtn = document.getElementById('enter-blog');
        let cover = document.getElementById('welcome');
        if (window.location.hash === '#blog') {
            cover.style.display = 'none';
        }
        enterBtn.addEventListener('click', function() {
            initMainPostList();
            window.location.hash='#blog';
            cover.style.top = -(mainPostList.viewHeight) + 'px';
        })
    }

    // navigation-bar's style change when resize the window.
    let navToggleBtn = document.getElementById('toggle-nav');
    let navBar = document.getElementsByTagName('nav')[0];    
    navBar.style.right = window.getComputedStyle(navBar).right + 'px';
    let navToggled = 0;
    let handleResize = function() {
        navToggled = 0;
        navToggleBtn.classList.remove('toggle');
        if(document.documentElement.clientWidth > 999) {
            navBar.style.right = '0px';
        } else {
            navBar.style.right = '-200px';
        }
    }
    window.addEventListener('resize', handleResize);
    navToggleBtn.addEventListener('click', function(){
        if(navToggled === 0) {
            navToggled = 1;
            navToggleBtn.classList.add('toggle');
            navBar.style.right = '0px';
        } else {
            navToggled = 0;
            navToggleBtn.classList.remove('toggle');
            navBar.style.right = '-200px';
        }
    })

    // contact page: display large QR code.
    if (window.location.pathname === "/contact.html") {
        let maxQr = document.getElementById('max-qr');
        document.getElementById('image-Wechat').addEventListener('click', function(){
            maxQr.classList.toggle('hidden');
        })
        maxQr.addEventListener('click', function() {
            maxQr.classList.toggle('hidden');
        })
    }
    
    // instantiate classes.
    // object: deer
    deer = new Deer();
    deer.init();

    // object: mainPostList
    if (window.location.hash === "#blog") {
        initMainPostList();
    }

    // object: tagnav
   if (window.location.pathname === "/tag-index.html") {
        tagNav = new TagNav();
        tagNav.init();
    }
})
