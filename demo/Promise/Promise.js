/**
 * 实现简易版的promise
 */

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function Promise(executor) {
    var _this = this
    _this.state = PENDING //状态
    _this.value = undefined //成功结果
    _this.reason = undefined //失败原因
    _this.onFulfilled = [];//成功的回调
    _this.onRejected = []; //失败的回调

    function resolve(value) {
        if (_this.state === PENDING) {
            _this.value = value
            _this.state = FULLFILLED
            _this.onFulfilled.forEach(fn => fn(_this.value))
        }
    }
    function reject(reason) {
        if (_this.state === PENDING) {
            _this.reason = reason
            _this.state = REJECTED
            _this.onRejected.forEach(fn => fn(_this.reason))
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
    if (this.state === FULLFILLED) {
        typeof onFullfilled === 'function' && onFullfilled(this.value)
    }
    if (this.state === REJECTED) {
        typeof onRejected === 'function' && onRejected(this.reason)
    }

    if (this.state === PENDING) {
        typeof onFullfilled === 'function' && this.onFulfilled.push(onFullfilled)
        typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
}

module.exports = Promise