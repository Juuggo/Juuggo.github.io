function footerUncover() {
    let uncoverLink = document.getElementById('uncover');
    let footer = document.getElementsByTagName('footer')[0];
    let navigator = document.getElementsByTagName('nav')[0];
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.hash === '#blog') {
            footer.classList.remove('covered');
            navigator.classList.remove('closed');
        }
    });
    uncoverLink.addEventListener('click', function() {
        footer.classList.remove('covered');
        setTimeout(function() {
            navigator.classList.remove('closed');
            mainPostList.textAnimation();
        }, 1000);
    });
}
footerUncover();

