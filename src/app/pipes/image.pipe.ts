import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

const URL = environment.url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${URL}/posts/image/${userId}/${img}`;
  }

}
