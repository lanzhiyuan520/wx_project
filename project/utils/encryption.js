var RSA = require('../WX_RSA-master/utils/wx_rsa')
var encStr = ''
var key ='-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3//sR2tXw0wrC2DySx8vNGlqt3Y7ldU9+LBLI6e1KS5lfc5jlTGF7KBTSkCHBM3ouEHWqp1ZJ85iJe59aF5gIB2klBd6h4wrbbHA2XE1sq21ykja/Gqx7/IRia3zQfxGv/qEkyGOx+XALVoOlZqDwh76o2n1vP1D+tD3amHsK7QIDAQAB-----END PUBLIC KEY-----'
function encryption(data){
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(key);
    encStr = encrypt_rsa.encrypt(data)
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)
    return encStr
}
module.exports = {
    encryption
}