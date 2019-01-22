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
            if(this.timeOutId){
                helper.clearTimeoutId(this.timeOutId);
            }
            this.stopPress('left');
            this.stopPress('right');
            this.stopWalk();
    }
    // document.addEventListener('DOMContentLoaded', function(event) {
    init() {
        document.getElementById('walkbtn').onclick = (event) => {
            this.stopAllAnimation();
            this.startWalk();
            this.timeOutId = setTimeout(() => {this.stopWalk()}, 2000);
        }
        document.getElementById('leftbtn').onclick = () => {
            this.stopAllAnimation();
            setTimeout(() => {this.startPress('left')}, 20);
        }
        document.getElementById('rightbtn').onclick = () => {
            this.stopAllAnimation();
            setTimeout(() => {this.startPress('right')}, 20);
        }
    }
    // });
}

var d = new Deer;
d.init();
