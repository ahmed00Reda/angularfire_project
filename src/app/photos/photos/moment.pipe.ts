import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any){
    value =moment(value).format('MMMM Do YYYY, h:mm:ss a');
    return value
  }

}
