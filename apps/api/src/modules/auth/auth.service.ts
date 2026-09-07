export class AuthService {
  async register(email: string, password: string) {
    return {
      email,
      status: 'created'
    }
  }

  async login(email: string) {
    return {
      email,
      token: 'jwt-placeholder'
    }
  }
}
