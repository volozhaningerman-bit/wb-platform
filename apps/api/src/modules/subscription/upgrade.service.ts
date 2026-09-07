export class SubscriptionUpgradeService {
 async execute(input:any={}){
  return {
   module:"subscription",
   action:"upgrade",
   input
  };
 }
}
