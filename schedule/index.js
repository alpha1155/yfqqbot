const schedule = require('node-schedule');
const map = { 9: 31, 10: 30, 11: 31 }
function reData() {
    let deadlines = {
        cet6: null,
        masterExam: null
    }
    let nowDate = new Date();
    switch (nowDate.getMonth()) {
        case 9:
            deadlines.cet6 = 70 - nowDate.getDate();
            deadlines.masterExam = 84 - nowDate.getDate();
            break;
        case 10:
            deadlines.cet6 = 39 - nowDate.getDate();
            deadlines.masterExam = 53 - nowDate.getDate();
            break;
        case 11:
            deadlines.cet6 = 9 - nowDate.getDate();
            deadlines.masterExam = 23 - nowDate.getDate();
            break;
        default:
            break;
    }
    return deadlines;
}


module.exports = options => {
    ({ ws }) => {
console.log("adwasaddsad---------------------------------------------------------------")
        let rule = new schedule.RecurrenceRule();
        rule.hour = [8, 22];
        rule.minute = 0;
        rule.second = 0;

        let job = schedule.scheduleJob('* * * * * *', (ws) => {

            let deadlines = reData()

            ws.send('send_group_msg', {
                group_id: 1019336961,
                message: [

                    {
                        type: 'text',
                        data: {
                            text: `距六级考试还有${deadlines.cet6}天\n距研究生招生考试还有${deadlines.masterExam}天`
                        }
                    }
                ]
            })
        })
        return job
    }
}
