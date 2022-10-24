import { Module } from "@nestjs/common";
import { MailgunModule } from "nestjs-mailgun";
import { MailService } from "./mail.service";

@Module({
    imports:[
        MailgunModule.forRoot({
            username: 'api',
            key: '406ac817567d9548f87f0920ddfa-7005f37e-468bfac0'
        })
    ],
    exports:[MailService],
    providers:[MailService]
})

export class MailModule {}
