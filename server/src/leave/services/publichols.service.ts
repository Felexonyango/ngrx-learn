import { Injectable } from "@nestjs/common";
import * as Axios from 'axios';

@Injectable()
export class PublicHolidayService {
    async getAllPublicHolidays(){
        const date = new Date();
        let year = date.getFullYear() - 1;
        let key = '7f72a9ee-08e0-4a43-b2a3-3ac37a1f5dd2';
        try {
            const holidays = await Axios.default.get(`https://holidayapi.com/v1/holidays?pretty&key=${key}&country=KE&year=${year}`)
                                                .then(response => {
                                                    return response.data;
                                                })
                                                .catch(e => {
                                                    throw e.Message;
                                                });
            const publicHolidays = holidays.holidays.filter(holiday => holiday.public == true && holiday.weekday.observed.numeric < 6);
            return publicHolidays;
        } catch(e){
            throw e;
        }
    }
}