//简易版示例
const Promise=require('./Promise')
var myPromise = new Promise(function (resolve, reject) {
    console.log('start执行')
    // resolve('同步resolve')
    setTimeout(function () {
        reject('异步reject')
    }, 1000)
});

myPromise.then(function (res) {
    console.log(res)
}, function (err) {
    console.log(err)
});



//完善版示例
// const Promise = require('./MyPromise')
// var p1 = new Promise((resolve, reject)=>{
//     resolve('p1')
// })
// p1.then((res)=>{
//     console.log(res)
//     return new Promise((resolve, reject)=>{
//         resolve(new Promise((resolve, reject)=>{
//             resolve('p2')
//         }))
//     })
// })
// .then((res1)=>{
//     console.log(res1)
//     return 'hello world'
// })
// .then((res2)=>{
//     console.log(res2)
// })