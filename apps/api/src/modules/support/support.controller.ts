export class SupportController {

  create(dto:any){
    return {
      ticketId:'new-ticket',
      status:'OPEN',
      subject:dto.subject
    };
  }
}
