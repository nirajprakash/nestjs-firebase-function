
import config = require('./../config/config.json');

export const configuration = () => ({
    recaptchaSecret: config.recaptchaSecret,
    mail: {
        privateKey: config.mail.privateKey,
        serviceClient: config.mail.serviceClient,
        to: config.mail.to,
        type: config.mail.type,
        user: config.mail.user
    }

})