
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

let insertOrUpdate= (knex, tableName, data)=> {
    const firstData = data[0] ? data[0] : data;
    return knex.raw(
      `${knex(tableName)
        .insert(data)
        .toQuery()} ON DUPLICATE KEY UPDATE ${Object.getOwnPropertyNames(
        firstData
      )
        .map(field => `${field}=VALUES(${field})`)
        .join(",")}`
    );
  }
module.exports={
    simpleselect,
    insertOrUpdate
}