export class SupportCloseService {
 async execute(input:any={}){
  return {
   module:"support",
   action:"close",
   input
  };
 }
}
