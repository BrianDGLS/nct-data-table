export const throttle = (fn: (...args: any[]) => any, wait: number) => {
  let inThrottle: any, lastFn: any, lastTime: any
  return function(this: any) {
    const context = this,
      args: any = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
