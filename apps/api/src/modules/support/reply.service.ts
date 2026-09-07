export class SupportReplyService {
 async execute(input:any={}){
  return {
   module:"support",
   action:"reply",
   input
  };
 }
}
