const expense_groups_perdiem = require('../../model/expenses/Expenses_groups_perdiem')



const tryleExpense = [
  {
    method: 'GET',
    path: '/getExpenses/Configurations',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: async (request, reply) => {
      const columnList = [raw('per.*,co.country,st.state')] // parameters for select
      const modalAlias = 'per' // Modal Alias
      const joinRelation = '[CountryRelation as co, StateRelation as st]'
      await selectquerywithwhere(
        request,
        expense_groups_perdiem,
        modalAlias,
        columnList,
        joinRelation,
        columnWhere,
        null,
        null
      )
        .then(async result => {
          console.log(result, 'ressssssssssss')
          perdiem = result
        })
        .catch(catch_err => {
          log.error(request, catch_err)
          logger.error(`Error is - ${catch_err}`)
        })
      await selectquery(
        request,
        expenses_sub_categories,
        'e1',
        'e1.*',
        null,
        null,
        null
      )
        .then(subCategoryData => {
          console.log(subCategoryData, 'sub category array')
          ret1 = subCategoryData
          success = true
          message = 'Fectching Expenses list.'
        })
        .catch(err => {
          logger.error(`Error is ${err}`)
          log.error(request, err)
          success = false
          message = errMsg.unable_to_fetch_list
        })
      return reply({
        edc: commonFun.encrypt(
          JSON.stringify({
            statusCode: 200,
            success,
            error,
            message,
            data: ret
          })
        )
      })
    }
  }
]

module.exports = tryleExpense
