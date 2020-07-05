
class Hook{
    constructor(args){
        if(!Array.isArray(args)){
            args=[];
        }
        this.args = args;
        this.taps = [];//存放钩子函数
        this._x = undefined;//这个重要
    }
    tap(name,fn){
        this.taps.push(fn);
    }
    call(...args){
        this.taps.forEach(fn=>fn(...args));
    }
}
module.exports = Hook;