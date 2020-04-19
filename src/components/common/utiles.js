// 防抖 让刷新执行的尽量不频繁
export function  debounce(func, delay) { //传函数、在单位时间等多久
    let timer = null
     return function(...args) {
       if (timer) clearTimeout(timer)
       timer = setTimeout(() => {
         func.apply(this, args)
       }, delay)
     }
  }
  // 刷新防抖