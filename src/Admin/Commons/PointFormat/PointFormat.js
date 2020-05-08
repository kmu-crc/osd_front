// const NumberFormat = (num) => {
//     let M = 1000000, K = 1000;
//     if(num > M) return (num/M).toFixed(1)+"M";
//     if(num === M) return (num/M).toFixed(0)+"M";
//     if(num > K) return (num/K).toFixed(1)+"K";
//     if(num === K) return (num/K).toFixed(0) + "K";
//     return num;
// }

const PointFormat = (num) =>{
    const Won = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return Won;
}

export default PointFormat;
// const Won = N => '₩' + N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");래