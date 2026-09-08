export class SubscriptionService {

 current(){
  return {
   plan:'FREE',
   features:[
    'basic analytics'
   ]
  };
 }

 upgrade(){
  return {
   plan:'FULL',
   paymentRequired:true
  };
 }
}
