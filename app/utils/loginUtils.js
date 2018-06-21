function judgeStaffAuth(staff,authCodeC,authCodeS) {

    if(isAdmin(staff)){
        return true;
    }
    if(isCSameWithoutS(staff,authCodeC,authCodeS)){
        return true;
    }
    if(isCSSame(staff,authCodeC,authCodeS)){
        return true;
    }
    return false;
}


function isAdmin(staff){
    const staffRole = staff.STAFF_ROLE;
    if(staffRole==='admin'||staffRole==='super_admin'){
        return true;
    }
    return false;
}

function isCSameWithoutS(staff,authCodeC,authCodeS){
    const authCodeCDB=staff.AUTH_CODE_C;
    const isAuthPassDB = staff.IS_AUTH_PASS;
    if(authCodeCDB===authCodeC&&isAuthPassDB==='0'&&(authCodeS===null||authCodeS===''||authCodeS==='undefined')){
        return true;
    }
    return false;
}

function isCSSame(staff,authCodeC,authCodeS){
    const authCodeCDB=staff.AUTH_CODE_C;
    const isAuthPassDB = staff.IS_AUTH_PASS;
    const authCodeSDB=staff.AUTH_CODE_S;
    if(authCodeCDB===authCodeC&&isAuthPassDB==='1'&&authCodeSDB===authCodeS){
        return true;
    }
    return false;
}


exports.judgeStaffAuth = judgeStaffAuth;

