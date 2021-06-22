import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStatus'
})
export class FormatStatusPipe implements PipeTransform {

  transform(value: String): String {
    if (value === '1') {
      return 'Masculino'
    } else if (value === '0') {

      return 'Femenino'
    }
    return value;
  }

}
