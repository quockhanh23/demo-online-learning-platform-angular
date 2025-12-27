import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicTestCreateComponent} from "./topic-test/topic-test-create/topic-test-create.component";
import {TestCreateComponent} from "./test/test-create/test-create.component";
import {LessonDetailComponent} from "./lesson/lesson-detail/lesson-detail.component";
import {CourseDetailComponent} from "./course/course-detail/course-detail.component";
import {CourseListComponent} from "./course/course-list/course-list.component";
import {TopicTestComponent} from "./topic-test/topic-test/topic-test.component";
import {CourseCreateComponent} from "./course/course-create/course-create.component";
import {LessonCreateComponent} from "./lesson/lesson-create/lesson-create.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./admin/register/register.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {AdminPageComponent} from "./admin/admin-page/admin-page.component";
import {SummaryComponent} from "./user/summary/summary.component";
import {TuitionComponent} from "./user/tuition/tuition.component";
import {SendBillComponent} from "./admin/send-bill/send-bill.component";
import {LessonPlanComponent} from "./user/lesson-plan/lesson-plan.component";
import {LessonUpdateComponent} from "./lesson/lesson-update/lesson-update.component";
import {CourseUpdateComponent} from "./course/course-update/course-update.component";
import {DepartmentCreateComponent} from "./admin/department-create/department-create.component";
import {DepartmentPageComponent} from "./admin/department-page/department-page.component";

const routes: Routes = [
  {
    path: '', component: CourseListComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'adminPage', component: AdminPageComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'detailUser/:id', component: UserDetailComponent,
  },
  {
    path: 'detailCourse/:id', component: CourseDetailComponent,
  },
  {
    path: 'updateCourse/:id', component: CourseUpdateComponent,
  },
  {
    path: 'createCourse', component: CourseCreateComponent,
  },
  {
    path: 'createLesson/:id', component: LessonCreateComponent,
  },
  {
    path: 'updateLesson/:id', component: LessonUpdateComponent,
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
  {
    path: 'summary', component: SummaryComponent,
  },
  {
    path: 'tuition', component: TuitionComponent,
  },
  {
    path: 'bill', component: SendBillComponent,
  },
  {
    path: 'lessonPlan', component: LessonPlanComponent,
  },
  {
    path: 'departmentCreate', component: DepartmentCreateComponent,
  },
  {
    path: 'departmentPage', component: DepartmentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
