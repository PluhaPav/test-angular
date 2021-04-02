import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateNumber',
})
export class FormateNumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value.replace(/\D+/g, ''));
  }
}
