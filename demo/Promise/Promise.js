/**
 * 实现简易版的promise
 */

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function Promise(executor) {
    var self = this
    self.state = PENDING //状态
    self.value = undefined //成功结果
    self.reason = undefined //失败原因
    self.onFulfilled = [];//成功的回调
    self.onRejected = []; //失败的回调

    function resolve(value) {
        if (self.state === PENDING) {
            self.value = value
            self.state = FULLFILLED
            self.onFulfilled.forEach(fn => fn(self.value))
        }
    }
    function reject(reason) {
        if (self.state === PENDING) {
            self.reason = reason
            self.state = REJECTED
            self.onRejected.forEach(fn => fn(self.reason))
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
    console.log('====================================');
    console.log(this);
    console.log('====================================');
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