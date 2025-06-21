import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicTestCreateComponent} from "./topic-test/topic-test-create/topic-test-create.component";
import {TestCreateComponent} from "./test/test-create/test-create.component";
import {LessonDetailComponent} from "./lesson/lesson-detail/lesson-detail.component";
import {CourseDetailComponent} from "./course/course-detail/course-detail.component";
import {CourseListComponent} from "./course/course-list/course-list.component";
import {TopicTestComponent} from "./topic-test/topic-test/topic-test.component";

const routes: Routes = [
  {
    path: '', component: CourseListComponent,
  },
  {
    path: 'detailCourse/:id', component: CourseDetailComponent,
  },
  {
    path: 'detailLesson/:id', component: LessonDetailComponent,
  },
  {
    path: 'testCreate/:idLesson', component: TestCreateComponent,
  },
  {
    path: 'topicTestCreate/:idLesson', component: TopicTestCreateComponent,
  },
  {
    path: 'topicTestDetail/:id', component: TopicTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
