import { ICar } from '../app/tipes';

export class Car implements ICar {
  constructor(
    public id: number,
    public color = '#000000',
    public name = '',
  ) {}
}
