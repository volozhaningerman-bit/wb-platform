import { AuthModule } from './modules/auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

export class AppModule {
  modules = [
    AuthModule,
    WorkspaceModule
  ];
}
