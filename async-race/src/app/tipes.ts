export interface ICar {
  id: number,
  color: string,
  name: string,
}
export interface IFinisher extends ICar {
  time: number,
}

export interface IStartStopEngine {
  velocity: number | null,
  distance: number | null
}

export interface IWinner extends ICar {
  id: number,
  wins: number,
  time: number,
}
