const userQuery = require('../library/userquery');
const BulkInsertion = require('../model/Bulk_insertion');

exports.bulkInsertion = {
    handler: async (req, res) => {
        // for multiple { } insert insertOrUpdateKnex is not working
        await userQuery.insertTableWithPromise(BulkInsertion, req.payload).then(data => {
            let response = {
                success: true,
                error: false,
                message: `data inserted successfully`,
                data: data
            }
            return res(response)
        }).catch(err => {
            console.log(err,"err")
            let response = {
                success: false,
                error: err,
                message: `failed to insert`,
            }
            return res(response)
        });
    }
}