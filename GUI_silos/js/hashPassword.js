function hashPassword(pwdObj) {
    var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashObj.update(pwdObj.value);
    var hash = hashObj.getHash("HEX");
    return hash;
}