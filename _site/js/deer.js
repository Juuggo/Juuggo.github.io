class Deer {
    constructor() {
        this.walkNodes=new Array('lhand', 'rhand', 'lfoot', 'rfoot','arrdown1', 'arrdown2');
        this.pressNodes=new Array('deer','rhand','lhand','lfoot','rfoot','arrleft1','arrleft2','arrright1','arrright2');
    }
    addClass(e, a) {
        let cls = a + '_' + e;
        document.getElementById(e).classList.add(cls);
    }
    rmvClass(e, a) {
        let cls = a + '_' + e;
        document.getElementById(e).classList.remove(cls);
    }
    startWalk() {
        for(let e in this.walkNodes) {
            this.addClass(this.walkNodes[e], 'walk');
        }
        this.rmvClass('arrsdown', 'hover');
    }
    stopWalk() {
        if(document.getElementById('rhand').classList.contains('walk_rhand')){
            for(let e in this.walkNodes) {
                this.rmvClass(this.walkNodes[e], 'walk');
            }
            this.addClass('arrsdown', 'hover');
        }
    }
    startPress(direct) {
        for(let e in this.pressNodes) {
            this.addClass(this.pressNodes[e], 'press'+direct);
        }
    }
    stopPress(direct) {
        if(document.getElementById('deer').classList.contains('press'+direct+'_deer')){
            for(let e in this.pressNodes) {
                this.rmvClass(this.pressNodes[e], 'press'+direct);
            }
        }
    }
    stopAllAnimation() {
        if(this.timeoutId){
            helper.clearTimeoutId(this.timeoutId);
            this.stopPress('left');
            this.stopPress('right');
            this.stopWalk();
        }
    }
    walkAnimation() {
        this.stopAllAnimation();
        this.startWalk();
        this.timeoutId = setTimeout(() => {this.stopWalk()}, 1200);
    }
    init() {
        let handleWalkBtnClick = helper.throttle(() => {
            mainPostList.scrollDown();
        }, 500, this);
        let handleLeftbtn = helper.throttle(() => { 
            // this.stopAllAnimation();
            // this.timeoutId = setTimeout(() => {this.startPress('left')}, 20);
            tagNav.scrollRight();
        }, 500, this);
        let handleRightbtn = helper.throttle(() => { 
            // this.stopAllAnimation();
            // this.timeoutId = setTimeout(() => {this.startPress('right')}, 20);
            tagNav.scrollLeft();
        }, 500, this);
        document.getElementById('walkbtn').onclick = handleWalkBtnClick;
        document.getElementById('leftbtn').addEventListener('click', handleLeftbtn);
        document.getElementById('rightbtn').addEventListener('click', handleRightbtn);
    } 
}
var deer = new Deer();
deer.init();
