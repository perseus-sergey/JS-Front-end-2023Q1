export interface ICarCreate {
  color: string,
  name: string,
}
export interface ICar extends ICarCreate {
  id: number,
}
export interface IFinisher extends ICar {
  time: number,
}

export interface IStartStopEngine {
  velocity: number | null,
  distance: number | null
}
export interface IWinnerApi {
  wins: number,
  time: number,
}
export interface IWinner extends ICar, IWinnerApi {
  id: number,
}
export interface IWinnerCreate extends IWinnerApi {
  id: number,
}
