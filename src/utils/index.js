import pinyin from "js-pinyin";



// 拆分名字为map
export const splitNameMap = (str) => {
    if (!str) {
        return new Map();
    }
    // const str = `孙荣兵   严科杰  葛缤纷  蒋益锋  郭正  田明鑫  季晓南  江俐兵   刘诗伟   李星 甘风  Mike   刘勇   王瑞  范国蕾  邱东  朱元兴  帅明华  董顺恒  吴士龙  董新  钱浩  卢海军  吴长鑫  方敏  胡芳  张秋娣  邢淑平  胡建军  戴正保  高艺桐  邱伟呜  秦旭  郑晓燕  金娅  邓晓蓉  褚夫敏  沈兰  刘建雄  陈操`
    const allNameReg = /[\u4e00-\u9fa5A-Za-z]{1,10}/g
    const nameReg = /[\u4e00-\u9fa5]{1,10}/g
    const enNameReg = /[A-Za-z]{1,10}/g;

    // 所有名字
    let allNameList = str.match(allNameReg) || []
    // 中文名
    const nameList = str.match(nameReg) || []
    // 英文名
    const enNameList = str.match(enNameReg) || []
    // 过滤重复的中文名
    const nameSet = new Set(nameList)
    // 重复名
    let dupNameList = [...new Set(nameList)].filter(item => nameList.indexOf(item) !== nameList.lastIndexOf(item))
    let dupEnNameList = [...new Set(enNameList)].filter(item => enNameList.indexOf(item) !== enNameList.lastIndexOf(item))

    const nameMap = new Map()
    // 组合中文名，按字数分
    for (const name of nameList) {
        const nameList = []
        const len = name.length
        const val = nameMap.get(len)
        if (!val) {
            nameList.push(name);
            nameMap.set(len, nameList)
            continue;
        }
        val.push(name);
    }
    nameMap.set('英文名', enNameList)
    nameMap.set('重复名', [...dupNameList, ...dupEnNameList])
    nameMap.set('总人数', [nameSet.size])

    allNameList=  [...new Set(allNameList)]
    // allNameList.sort((a, b) => {
    //         return a.letter.localeCompare(b.letter);
    //     });

    allNameList.sort((a, b) => {
        const piny = pinyin.getFullChars(a);
``
        var aFirst = pinyin.getFullChars(a).toUpperCase()
        var bFirst = pinyin.getFullChars(b).toUpperCase()

        if (aFirst < bFirst) {
            return -1
        } else if (aFirst > bFirst) {
            return 1
        } else {
            return 0
        }
    })
    nameMap.set('allNameSortList', allNameList)

    // console.log(nameMap)
    // let res = ``
    // for (let [key, value] of nameMap) {
    //     res += key + `个字，数量: ${value.length}个人 ===========================================\n`
    //     for (const name of value) {
    //         res += name + '\n'
    //     }
    // }
    return nameMap;
}

export const splitNameList = (str) => {
    if (!str) {
        return new Map();
    }
    // const str = `孙荣兵   严科杰  葛缤纷  蒋益锋  郭正  田明鑫  季晓南  江俐兵   刘诗伟   李星 甘风  Mike   刘勇   王瑞  范国蕾  邱东  朱元兴  帅明华  董顺恒  吴士龙  董新  钱浩  卢海军  吴长鑫  方敏  胡芳  张秋娣  邢淑平  胡建军  戴正保  高艺桐  邱伟呜  秦旭  郑晓燕  金娅  邓晓蓉  褚夫敏  沈兰  刘建雄  陈操`
    const nameReg = /[\u4e00-\u9fa5A-Za-z]{1,10}/g

    // 中文名
    const nameList = str.match(nameReg) || []
    return nameList;
}

// 文本复制
export const copyText = (text) => {
    var textArea = document.createElement("textarea")
    textArea.value = text

    // 使文本框可视
    document.body.appendChild(textArea)

    // 选择文本框内容
    textArea.select()

    // 执行复制命令
    document.execCommand('copy')

    // 移除文本框
    document.body.removeChild(textArea)
}
