const cron = require('node-cron');

//for every sec
cron.schedule('*/1 * * * * *', async () => {
    // console.log("Cron job ...")
});
