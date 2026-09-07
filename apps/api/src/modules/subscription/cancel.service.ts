export class SubscriptionCancelService {
 async execute(input:any={}){
  return {
   module:"subscription",
   action:"cancel",
   input
  };
 }
}
