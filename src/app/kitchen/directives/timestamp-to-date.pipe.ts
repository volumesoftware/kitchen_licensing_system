import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

    transform(value: { nanoseconds: number, seconds: number }): Date | string | null {
        if(!value) return "Date invalid"
        const date = new Date(value.seconds);
        return date;
    }
}
