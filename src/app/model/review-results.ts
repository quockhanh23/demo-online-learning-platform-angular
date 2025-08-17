import {Essay} from "./essay";
import {MultipleChoice} from "./multiple-choice";

export interface ReviewResults {
  essays?: Essay[]
  multipleChoices?: MultipleChoice[]
  totalCorrectAnswer?: string
}
