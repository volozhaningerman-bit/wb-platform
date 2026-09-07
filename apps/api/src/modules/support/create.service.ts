export class SupportCreateService {
 async execute(input:any={}){
  return {
   module:"support",
   action:"create",
   input
  };
 }
}
