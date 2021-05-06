export const PxToVH = (px) => {
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)    
    // const value = parseFloat(px / vh) * 100;
    // return value;

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        // x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    return (100 * px) / y;
}