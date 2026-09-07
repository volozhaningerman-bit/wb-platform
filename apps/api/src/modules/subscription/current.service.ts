export class SubscriptionCurrentService {
 async execute(input:any={}){
  return {
   module:"subscription",
   action:"current",
   input
  };
 }
}
