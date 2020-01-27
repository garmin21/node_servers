/**
 * @description 生成错误信息的模块
 */

 /* 
    errcode : 状态码：0 成功， 1，2，3，4...失败
    data : 成功返回的数据
    message : 失败返回的数据
 */

 class Information {
    constructor({errCode,data,message}){
        this.errCode = errCode
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
 }

 class SucceedModel extends Information{
     constructor({errCode,data}){
         super({errCode,data})
     }
 }

 class FailureModel extends Information{
     constructor({errCode,message}){
         super({errCode,message})
     }
 }

 module.exports = {
    SucceedModel,
    FailureModel
 }