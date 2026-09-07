export class WbController {

  connect(dto:any){
    return {
      status:'connected',
      shop:dto.name
    };
  }

  list(){
    return [
      {
        name:'WB cabinet',
        status:'active'
      }
    ];
  }
}
