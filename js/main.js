document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('touchstart', function(){
        let domsWithHover = document.getElementsByClassName('hover');
        for(let i = 0; i < domsWithHover.length; i++) {
            console.log(domsWithHover[i]);
            domsWithHover[i].classList.remove('hover');
        }
    })
})
