export class PrismaService {

  async onModuleInit(){
    console.log('Database connection initialized');
  }

  async onModuleDestroy(){
    console.log('Database connection closed');
  }
}
