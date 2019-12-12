
let simpleselect = (tablemap,columnlist,whereCond) =>{
    return new Promise((resolve,reject)=>{
        let model = tablemap.query().select(columnlist)
        if(whereCond){
            model = model.whereRaw(whereCond)
        }
        model.then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    });
}
module.exports={
    simpleselect
}