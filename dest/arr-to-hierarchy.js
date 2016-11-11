(function () {
    function getHierachyDatas(raw, hierachyDatas, curHierarchy, hierarchyCfg, keyMap) {
        var data;
        if (curHierarchy === hierarchyCfg.length) {
            data = {};
            for (var key in keyMap) {

                if (hierarchyCfg.every(function (cfg) { return key !== cfg.rawKey; })) {
                    data[keyMap[key]] = raw[key];
                }
            }
            hierachyDatas.push(data);
        } else {

            if (!hierachyDatas.some(function (data) {
                if (data[keyMap[hierarchyCfg[curHierarchy].rawKey]] ===
                    raw[hierarchyCfg[curHierarchy].rawKey]) {

                    getHierachyDatas(
                        raw,
                        data[hierarchyCfg[curHierarchy].next],
                        curHierarchy + 1,
                        hierarchyCfg
                    );

                    return true;
                }
            })) {
                data = {};
                data[keyMap[hierarchyCfg[curHierarchy].rawKey]] = raw[hierarchyCfg[curHierarchy].rawKey];
                data[hierarchyCfg[curHierarchy].next] = [];

                hierachyDatas.push(data);
                getHierachyDatas(
                    raw,
                    data[hierarchyCfg[curHierarchy].next],
                    curHierarchy + 1,
                    hierarchyCfg
                );
            }
        }
        return hierachyDatas;
    }

    function parse(raws, hierarchyCfg, keyMap) {
        var hierachyDatas = [];
        raws.forEach(function (raw) {
            getHierachyDatas(raw, hierachyDatas, 0, hierarchyCfg, keyMap);
        });
        return hierachyDatas;
    }

    var moduleName = parse;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () { return moduleName; });
    } else {
        this.moduleName = moduleName;
    }
}).call(function () {
    return this || (typeof window !== 'undefined' ? window : global);
});