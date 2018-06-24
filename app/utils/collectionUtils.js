function transList2Map(list,key,value) {
    const map = new Map();
    list.forEach(
        (item) => map.set(item[value], item[key])
    );
    return map;
}

exports.transList2Map = transList2Map;

