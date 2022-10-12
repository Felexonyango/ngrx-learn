import { Injectable } from "@nestjs/common";
import { MailgunMessageData, MailgunService } from "nestjs-mailgun";

@Injectable()
export class MailService {
    constructor(private mailgunService:MailgunService){}

    async sendMail(data){
        const options: MailgunMessageData = {
            from: 'test@gmail.com',
            to: `${data.to}`,
            subject: `${data.subject}`,
            text: `${data.text}`,
            html: '',
            attachment: '',
            cc: '',
            bcc: '',
            'o:testmode': 'no',
            'h:X-Mailgun-Variables': '{"key":"value"}',
        }

        await this.mailgunService.createEmail("sandbox0f00d10bdfd74674dad6017d087a19b27.mailgun.org", options)
                                 .then(response => {
                                    console.log(response);
                                 })
                                 .catch(error => {
                                    console.log(error);
                                 })
    }
}