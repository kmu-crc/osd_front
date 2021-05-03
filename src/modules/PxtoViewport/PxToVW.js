export const PxToVW = (px) => {
    // const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // const vw = parseFloat(px / viewport) * 100;
    // return `${vw}vw`;

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth
    // y = w.innerHeight || e.clientHeight || g.clientHeight;

    return `${(100 * px) / x}vw`;
}