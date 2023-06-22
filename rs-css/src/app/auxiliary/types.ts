export interface ILevelInfo {
  levelFinished: boolean,
  cheat: boolean,
  mistakeCount: number,
}
export interface IUserStatus {
  [levelNumb: number]: ILevelInfo
}

export interface ILevel {
  levelH1: string;
  levelDescr: string;
  learnTitle: string;
  learnSelector: string;
  promptText: string;
  examples?: string[];
  levelRightAnswer: string;
  levelTask: string;
  // taskElements?: string[][];
}
enum Things {
  CARPET,
  PLATE,
  BREAD,
  CUCUMBER,
  APPLE,
}

const {
  CARPET,
  PLATE,
  CUCUMBER,
  APPLE,
} = Things;

interface IService {
  things: Things[][];

}
const service: IService = {
  things: [[CARPET, PLATE, CUCUMBER], [CARPET, PLATE, APPLE]],
};
