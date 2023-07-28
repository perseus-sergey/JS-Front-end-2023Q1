import { ICar } from '../common/types';

export class Car implements ICar {
  constructor(
    public id: number,
    public color = '#000000',
    public name = '',
  ) {}
}
