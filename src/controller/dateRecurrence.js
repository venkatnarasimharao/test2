// date recurrence based on user enter feild
// if he select a week and gives input as 2 or 3 
// it will repeate the meeting on the same day of this month 

// if user selects monthly
// recurrence will be on the same day of every month based on input value of recurrence
const dateRecurrence =[
    {
        path: '/pm/insertMeetings',
        method: 'POST',
        config: {
          auth: {
            strategy: 'token'
          }
        },
        handler: async (request, reply) => {
          const input = JSON.parse(decrypt(request.payload.edc))
          // validate input
          const schema = Joi.object({
            meeting_title: Joi.string().required(),
            emp_id: Joi.string().required(),
            recurrance: Joi.string(),
            recurrance_freq: Joi.number(),
            selected_date: Joi.string(),
            selected_time: Joi.string(),
            selected_out_time: Joi.string()
          }).required()
    
          const { error } = schema.validate(input)
          if (error) {
            const errorMessage =
              'Input validation failed. Input received is not in the format expected'
            console.error(api, errorMessage, error)
            result.success = false
            result.errorMessage = errorMessage
    
            return reply({
              edc: encrypt(
                JSON.stringify({
                  success: true,
                  result
                })
              )
            })
          }
          const CurrentDate = new Date()
          let endDt
          let datesArray
          let dataArray = []
          // Create Transaction
          console.log(input.recurrance, 'input.recurrance')
          if (input.recurrance === 'week') {
            endDt = new Date(
              CurrentDate.getFullYear(),
              CurrentDate.getMonth() + 1,
              0
            )
            datesArray = recurringDates(
              moment(input.selected_date).toDate(),
              moment(endDt).toDate(),
              7
            )
            datesArray = [
              input.selected_date,
              ...datesArray.map(item => moment(item).format('YYYY-MM-DD'))
            ]
            console.log(datesArray, 'datesArraydatesArray', input.recurrance_freq)
    
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < Number(input.recurrance_freq); i++) {
              dataArray.push(datesArray[i])
            }
            dataArray = dataArray.map(item => {
              const obj = {}
              obj.selected_date = item
              obj.meeting_title = input.meeting_title
              obj.emp_id = input.emp_id
              obj.recurrance = input.recurrance
              obj.recurrance_freq = input.recurrance_freq
              obj.selected_time = input.selected_time
              obj.selected_out_time = input.selected_out_time
              obj.conducted_emp_id = request.auth.credentials.username
              return obj
            })
          } else if (input.recurrance === 'month') {
            const monthSet = new Date(input.selected_date).getMonth() + 1
            let monthNew
            // eslint-disable-next-line no-plusplus
            for (let i = -1; i < Number(input.recurrance_freq) - 1; i++) {
              monthNew = new Date(input.selected_date).setMonth(monthSet + i)
              dataArray.push(moment(new Date(monthNew)).format('YYYY-MM-DD'))
            }
            dataArray = dataArray.map(item => {
              const obj = {}
              obj.selected_date = item
              obj.meeting_title = input.meeting_title
              obj.emp_id = input.emp_id
              obj.recurrance = input.recurrance
              obj.recurrance_freq = input.recurrance_freq
              obj.selected_time = input.selected_time
              obj.selected_out_time = input.selected_out_time
              obj.conducted_emp_id = request.auth.credentials.username
              return obj
            })
          } else {
            input.conducted_emp_id = request.auth.credentials.username
            dataArray = input
          }
          console.log(dataArray, 'sending Array obj')
    
          await insertOrUpdate(request, pmmeetings, dataArray)
            .then(() => {
              result.success = true
              result.message = `Succesfully meeting scheduled`
            })
            .catch(err => {
              const errorMessage = `Failed canceling scheduled check-ins`
              console.error(errorMessage, err)
              result.success = false
              result.errorMessage = errorMessage
            })
          return reply({
            edc: encrypt(
              JSON.stringify({
                success: true,
                result
              })
            )
          })
        }
      },
]


function recurringDates(startDate, endDate, interval) {
    // initialize date variable with start date
    let date = startDate
    // create array to hold result dates
    const dates = []
  
    // check for dates in range
    // eslint-disable-next-line no-cond-assign
    while ((date = addDays(date, interval)) < endDate) {
      // add new date to array
      dates.push(date)
    }
  
    // return result dates
    return dates
  }
  
  function addDays(date, days) {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + days)
    return newDate
  }