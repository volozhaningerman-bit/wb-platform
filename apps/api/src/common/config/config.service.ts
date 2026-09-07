export class ConfigService {
 get(key:string){
  return process.env[key];
 }
}
