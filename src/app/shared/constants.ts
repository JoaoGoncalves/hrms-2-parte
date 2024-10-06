import { InjectionToken } from "@angular/core"

const CONSTANTS = {
  apiUrl: 'https://my-json-server.typicode.com/JoaoGoncalves/hrms-api',
}

export const Constants = new InjectionToken('Constants', {
  factory(){
    return CONSTANTS;
  },
  providedIn: 'root'
})
