export class JwtStrategy {
  validate(payload: { sub: string }) {
    return payload;
  }
}
