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
  BREAD,
  CUCUMBER,
  APPLE,
} = Things;

interface Service {
  things: Things[][];

}
const service: Service = {
  things: [[CARPET, PLATE, CUCUMBER], [CARPET, PLATE, APPLE]],
};
