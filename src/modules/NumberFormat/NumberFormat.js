const NumberFormat = (num) => {
    let M = 1000000, K = 1000;
    if(num > M) return (num/M).toFixed(1)+"M";
    if(num === M) return (num/M).toFixed(0)+"M";
    if(num > K) return (num/K).toFixed(1)+"K";
    if(num === K) return (num/K).toFixed(0) + "K";
    return num;
}

export default NumberFormat;
// const Won = N => '₩' + N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");