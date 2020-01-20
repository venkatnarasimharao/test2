
let simpleselect = (tablemap, columnlist, whereCond) => {
    return new Promise((resolve, reject) => {
        let model = tablemap.query().select(columnlist)
        if (whereCond) {
            model = model.whereRaw(whereCond)
        }
        model.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    });
}

let insertOrUpdate = (knex, tableName, data) => {
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

let insertTableWithPromise = (Model, data) => {
    return new Promise((resolve, reject) => {
        let que = Model.query().insert(data);
        let mod = Model.raw(que);
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    });
}

let insertTable = (Model, data) => {
    const que = Model.query().insert(data).toString();
    return Model.raw(que);
}

let deleteTableData = (Model, CondIdColmn, CondId) => {
    return new Promise((resolve, reject) => {
        let que = Model.query().delete().where(CondIdColmn, CondId);
        que.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

let insertOrUpdateKnex = async (request, Model, data) => {
    const firstData = data[0] ? data[0] : data
    console.log(firstData, "firstdata")
    const insertQuery = await Model.query(request.knex)
        .insert(data)
        .toString()
    const onConflict = await Object.getOwnPropertyNames(firstData)
        .map(c => (c === Model.idColumn ? ',' : `${c} = VALUES(${c})`))
        .join(',')
        .replace(',,', '')
    const que = await `${insertQuery.replace(
        /\?/g,
        '\\?'
    )} ON DUPLICATE KEY UPDATE ${onConflict}`
    console.log('que in  insertOrUpdate', que.toString())
    return request.knex.raw(que)
}

const insertTableMultipletrx = (request, Model, data, trx) =>
    Model.query(request.knex)
        .insertGraph(data)
        .transacting(trx)

const insertOrUpdateTransaction = async (request, Model, data, trx) => {
    const firstData = data[0] ? data[0] : data
    const insertQuery = await Model.query(request.knex)
        .insert(data)
        .toString()
    const onConflict = await Object.getOwnPropertyNames(firstData)
        .map(c => (c === Model.idColumn ? ',' : `${c} = VALUES(${c})`))
        .join(',')
        .replace(',,', '')
    const que = await `${insertQuery} ON DUPLICATE KEY UPDATE ${onConflict}`
    console.log(request.knex.raw(que).toString(), data)
    return request.knex.raw(que).transacting(trx)
}

const commonSelectQuery = (request, Model, ModelAlias, allData) => {
    let query
    return new Promise((resolve, reject) => {
        try {
            // 1 model
            query = Model.query(request.knex)
            // 2 alias
            if (ModelAlias) query = query.alias(ModelAlias)
            // 3 select list
            query = query.select(raw(allData.selectList))
            // 4 joins
            if (allData.joins) {
                for (const row of allData.joins) {
                    switch (row.type) {
                        case 'left':
                            query = query.leftJoin(
                                `${row.tableName} as ${row.alias}`,
                                raw(row.onConditions)
                            )
                            break
                        case 'right':
                            query = query.rightJoin(
                                `${row.tableName} as ${row.alias}`,
                                raw(row.onConditions)
                            )
                            break
                        case 'inner':
                            query = query.innerJoin(
                                `${row.tableName} as ${row.alias}`,
                                raw(row.onConditions)
                            )
                            break
                        case 'full':
                            query = query.fullOuterJoin(
                                `${row.tableName} as ${row.alias}`,
                                raw(row.onConditions)
                            )
                            break
                        case 'relation':
                            query = query.joinRelation(`${row.tableName} as ${row.alias}`)
                            break
                        case 'inner-relation':
                            query = query.innerJoinRelation(`${row.tableName}`)
                            break
                        case 'left-relation':
                            query = query.leftJoinRelation(`${row.tableName}`)
                            break
                        case 'right-relation':
                            query = query.rightJoinRelation(`${row.tableName}`)
                            break
                        default:
                            break
                    }
                }
            }
            // 5 where
            if (allData.where) query = query.whereRaw(allData.where)
            // 6 having
            if (allData.having) query = query.havingRaw(allData.having)
            // 7 group by
            if (allData.groupBy) query = query.groupByRaw(allData.groupBy)
            if (allData.groupby) query = query.groupByRaw(allData.groupby)
            // 8 order by
            if (allData.orderBy) query = query.orderByRaw(allData.orderBy)
            if (allData.orderby) query = query.orderByRaw(allData.orderby)
            // 9 limit
            if (allData.limit) query = query.limit(allData.limit)
            if (allData.skip) query = query.offset(allData.skip)

            console.log(query.toString(), 'FINAL Select Query ***')
            resolve(query)
        } catch (error) {
            console.log(error, '$$error in common function')
            reject(error)
        }
    })
}
// let insertOrUpdatePromise = (Model, data) => {
//     return new Promise((resolve, reject) => {
//         const firstData = data[0] ? data[0] : data
//         const insertQuery = Model.query().insert(data).toString()
//         const onConflict = Object.getOwnPropertyNames(firstData)
//             .map(c => (c === Model.idColumn ? ',' : `${c} = VALUES(${c})`)).join(',').replace(',,', '')
//         const que = `${insertQuery.replace(
//             /\?/g,
//             '\\?'
//         )} ON DUPLICATE KEY UPDATE ${onConflict}`
//         que.then(result => {
//             resolve(result);
//         }).catch(error => {
//             reject(error);
//         })
//     });
// }

module.exports = {
    simpleselect,
    insertOrUpdate,
    insertOrUpdateKnex,
    insertTableMultipletrx,
    insertTableWithPromise,
    // insertOrUpdatePromise,
    insertOrUpdateTransaction,
    insertTable,
    deleteTableData,
    commonSelectQuery
}