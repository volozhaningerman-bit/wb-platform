export class PrismaService {
  private connected = false;

  async onModuleInit(){
    this.connected = true;
  }

  async health(){
    return {
      database: this.connected ? 'connected' : 'disconnected'
    };
  }
}
