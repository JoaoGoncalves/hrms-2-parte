import { InjectionToken } from "@angular/core"

const CONSTANTS = {
  apiUrl: 'http://localhost:3000',
  //apiUrl: 'https://my-json-server.typicode.com/JoaoGoncalves/hrms-api',
}

export const Constants = new InjectionToken('Constants', {
  factory(){
    return CONSTANTS;
  },
  providedIn: 'root'
})
