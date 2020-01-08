const cron = require('node-cron');

//for every sec
cron.schedule('*/1 * * * * *', async () => {
    // console.log("Cron job ...")
});

cron.schedule('59 * * * * *', async () => {
    console.log("Cron is running...")
});