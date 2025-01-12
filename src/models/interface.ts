export interface SystemInfo {
  systemMode: string;
  endEmail: string;
  studentIdLength: number;
  studentIdLastTwoDigit: string;
  nongText: string;
  peeText: string;
  newText: string;
  updateText: string;
  manageText: string;
  questionText: string;
  textQuestionText: string;
  choiceQuestionText: string;
  chatText: string;
}
export interface SignId {
  email: string;
}
export interface VerifyEmail {
  email: string;
  token: string;
}
