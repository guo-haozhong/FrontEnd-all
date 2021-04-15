/**
 * 实现promise
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
    var _this = this //promise1
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    var promise2 = new Promise((resolve, reject) => {
        if (_this.state === FULLFILLED) {
            setTimeout(() => {
                try {
                    let x = onFullfilled(_this.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        else if (_this.state === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        else if (_this.state === PENDING) {
            _this.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(_this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            _this.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(_this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }
    })

    return promise2
}

//promise2：新的Promise对象
//x：上一个then的返回值
//resolve：promise2的resolve
//reject：promise2的reject
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'))
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (used) return;
                    used = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (used) return;
                    used = true
                    reject(r)
                })
            } else {
                if (used) return;
                used = true
                resolve(x)
            }
        } catch (e) {
            if (used) return;
            used = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
module.exports = Promise