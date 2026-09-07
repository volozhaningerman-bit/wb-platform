export abstract class Repository<T> {
  abstract find(id:string):Promise<T|null>;
  abstract create(data:Partial<T>):Promise<T>;
}
