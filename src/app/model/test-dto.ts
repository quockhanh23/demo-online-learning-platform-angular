import {EssayAnswer} from "./essay-answer";
import {MultipleChoiceAnswer} from "./multiple-choice-answer";

export interface TestDTO {
  id?: string;
  testName?: string;
  type?: string;
  content?: string;
  status?: string;
  createdDate?: string;
  updatedDate?: string;
  idStudent?: string;
  time?: string;
  essayAnswerList?: EssayAnswer[];
  multipleChoiceAnswerList?: MultipleChoiceAnswer[];
  score?: string;
  scoreString?: string;
}
