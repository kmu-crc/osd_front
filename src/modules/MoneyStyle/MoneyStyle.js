const MoneyStyle = x => {
    let y = ``;
    x = x / 1200; //$
    if (x) {
        y = /*`₩`*/`$` + x.toPrecision(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
    } else {
        y = `free`;
    }
    return y;
}

export default MoneyStyle;
