export class NotificationsReadService {
 async execute(input:any={}){
  return {
   module:"notifications",
   action:"read",
   input
  };
 }
}
