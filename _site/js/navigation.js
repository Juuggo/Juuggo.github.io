document.addEventListener('DOMContentLoaded', function() {
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
})
