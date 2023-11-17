import { sendEmail } from "./sendEmail.js";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                from: 'joatansampaio@live.com',
                to: 'joatansampaio@live.com',
                subject: 'Testing',
                text: 'Hello there',
                html: '<b> Testing a test </b>',
            })
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({message: 'Couldn\t perform action'})
        }
    }
}