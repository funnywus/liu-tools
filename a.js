const splitNameList = () => {
    const str = `孙荣兵 蒋益锋   ab  和气 阿旭 安装下 哎 郭正  田明鑫  季晓南  江俐兵  a b c`
    const nameReg = /[\u4e00-\u9fa5A-Za-z]{1,10}/g
    // 中文名
    let allNameList = str.match(nameReg) || []
    console.log(allNameList)
    allNameList.sort((a, b) => {
        var aFirst = getFirstLetter(a)
        console.log(aFirst)
        var bFirst = getFirstLetter(b)

        if (aFirst < bFirst) {
            return -1
        } else if (aFirst > bFirst) {
            return 1
        } else {
            return 0
        }
    })

    allNameList.forEach(item => {
        // console.log(item)
    })
}
splitNameList()

function getFirstLetter(name) {
    const l = name[0];
    if (/[A-Za-z]/.test(l)) {
        return l;
    }
    var unicode = name[0].charCodeAt(0) - 19968
    return String.fromCharCode(unicode + 32)
}
