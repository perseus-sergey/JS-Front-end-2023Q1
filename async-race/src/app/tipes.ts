export interface ICar {
  id: number,
  color: string,
  name: string,
  // velocity?: number,
}
// export class Car implements ICar {
//   constructor(
//     public id: number,
//     public color = '#000000',
//     public name = '',
//     public velocity = 0,
//   ) {}
// }
export interface IFinisher extends ICar {
  time: number,
}

export interface IStartStopEngine {
  velocity: number | null,
  distance: number | null
}
