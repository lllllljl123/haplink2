import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANbkRBYtvyZB8Fdh6W/cIA9nC/fP1N01\n' +
  'DAYdteGeUXI+KEtI4WsxUBhRHUHX2p3hiNgIoziHdCB5VrBAq0R0np8CAwEAAQ=='

const privateKey = 'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA1uREFi2/JkHwV2Hp\n' +
  'b9wgD2cL98/U3TUMBh214Z5Rcj4oS0jhazFQGFEdQdfaneGI2AijOId0IHlWsECr\n' +
  'RHSenwIDAQABAkEA0BZ+sBNgdEWJ3LQdfopkKUYZ2sBQWlyR5iJDC9Vo/PvY6xck\n' +
  'hdppC4g7BfEAYG10XsZBgUKisClmkxPpLRo3AQIhAPacALGbhDq4sQ6IjN1D9rBj\n' +
  'VU+DkD+2GEbo+A7iuBjBAiEA3xMSlfIhR9qngotzk9vVixOT2nEChBszgfwNpGOY\n' +
  'L18CIAFW75oHYjx/bFbL3xgEmn5yy6/W4x21e4RHF7HdAWsBAiAcN6toMEKpdi0u\n' +
  'RDmQgIRYnVdckGMDFvXDAYEwRDDh/QIhAPC6gQUEWv7jY4S9OG6DprvM6ETyTgis\n' +
  'O7BLP0so464h'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

