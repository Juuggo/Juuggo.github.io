function footerUncover() {
    let uncoverBtn = document.getElementById('uncover');
    uncoverBtn.addEventListener('click', function() {
        let footer= document.getElementsByTagName('footer')[0];
        footer.classList.remove('covered');
        setTimeout(function() {
            document.getElementById('right-nav').classList.remove('closed');
            mainPostList.textAnimation();
        }, 1000);
    });
}
footerUncover();
