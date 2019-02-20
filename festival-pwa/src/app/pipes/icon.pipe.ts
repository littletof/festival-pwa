import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    return 'svg/md-' + value + '.svg';
  }

}
