export class AnalyticsController {

  overview(){
    return {
      sales:0,
      profit:0,
      advertising:0
    };
  }

  categories(){
    return {
      name:'all',
      children:[]
    };
  }

  products(){
    return {
      items:[]
    };
  }
}
