export class HealthController {

 check(){
  return {
   status:'ok',
   service:'wb-platform-api',
   time:new Date()
  };
 }
}
