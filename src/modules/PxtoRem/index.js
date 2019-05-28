const PxtoRem = (point) => {
  const HTML = window.document.querySelector("html");
  const style = window.getComputedStyle(HTML, null);
  let rootFont = style.fontSize;
  rootFont = parseInt(rootFont, 10)
  return `${point/rootFont}rem`;
}

export default PxtoRem;
