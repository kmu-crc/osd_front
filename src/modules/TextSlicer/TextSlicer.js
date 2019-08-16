const TextSlicer = (str, len) => {
    const postfix = "..."
    return (
        str.length <= len ? str : str.slice(0, len) + postfix
    )
}
export default TextSlicer
