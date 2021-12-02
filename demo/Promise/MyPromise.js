/**
 * 实现promise
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
    var self = this //promise1
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    var promise2 = new Promise((resolve, reject) => {
        if (self.state === FULLFILLED) {
            setTimeout(() => {
                try {
                    let x = onFullfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        else if (self.state === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        else if (self.state === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
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