import { PipeTransform, Pipe } from "@angular/core";
import { environment } from 'src/environments/environment';


@Pipe({
  name: "bindToServer",
})
export class BindToServerPipe implements PipeTransform {
  transform(value: string) {
  
    return  environment.DataBaseUrl +  value;
  }
}
