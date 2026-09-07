export class AnalyticsService {

  overview(){
    return {
      revenue:0,
      profit:0,
      advertising:0
    };
  }

  categoryTree(){
    return {
      name:'Все категории',
      children:[]
    };
  }

  productMatrix(){
    return {
      x:'revenue',
      y:'profit'
    };
  }
}
