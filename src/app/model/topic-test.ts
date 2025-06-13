import {MultipleChoiceQuestion} from "./multiple-choice-question";
import {EssayQuestion} from "./essay-question";

export interface TopicTest {
  id?: string;
  testName?: string;
  type?: string;
  content?: string;
  status?: string;
  idCourse?: string;
  idLesson?: string;
  idTeacher?: string;
  multipleChoiceQuestion: MultipleChoiceQuestion[]
  essayQuestion: EssayQuestion[]
}
