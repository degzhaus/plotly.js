'use strict';

var BADNUM = require('../../constants/numerical').BADNUM;

module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var trace = cd[0].trace;

    var di, x, y, i;

    if(selectionTester === false) {
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            di = cd[i];
            
            // Check if this is a valid arrow segment
            if(di.length < 2) continue;
            
            // Use the start point of the arrow for selection
            x = xa.c2p(di[0].x);
            y = ya.c2p(di[0].y);

            if(selectionTester.contains([x, y], null, i, searchInfo)) {
                selection.push({
                    pointNumber: i,
                    x: di[0].x,
                    y: di[0].y,
                    u: trace.u[i],
                    v: trace.v[i]
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    return selection;
};
