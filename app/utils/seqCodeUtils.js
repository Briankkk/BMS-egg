const _ = require('lodash');
function getSeqCode(prefix,seq,suffix) {
    return prefix + _.padStart((parseInt(seq) + 1), 3,'0')+ suffix;
}

exports.getSeqCode = getSeqCode;

