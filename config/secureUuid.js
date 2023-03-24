
const crypto = require('crypto')
const uuId = crypto.randomUUID()
const uuid = require('uuid').v4()
let moreSecureUuId = uuId

// exports.uuid = moreSecureUuId
exports.uuid = (reg)=>{
     moreSecureUuId
     reg = Math.random() 
     return reg
}

