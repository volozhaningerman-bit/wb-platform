export class NotificationsCreateService {
 async execute(input:any={}){
  return {
   module:"notifications",
   action:"create",
   input
  };
 }
}
