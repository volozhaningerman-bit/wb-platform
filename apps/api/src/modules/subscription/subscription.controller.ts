export class SubscriptionController {

  current(){
    return {
      plan:'FREE',
      active:true
    };
  }

  upgrade(){
    return {
      payment:'pending'
    };
  }
}
