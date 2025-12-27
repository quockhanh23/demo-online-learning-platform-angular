import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './component/dialog/dialog.component';
import {MaterialModule} from "./material/material.module";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CourseCreateComponent} from './component/course/course-create/course-create.component';
import {CourseDetailComponent} from './component/course/course-detail/course-detail.component';
import {CourseListComponent} from './component/course/course-list/course-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LessonCreateComponent} from './component/lesson/lesson-create/lesson-create.component';
import {LessonDetailComponent} from './component/lesson/lesson-detail/lesson-detail.component';
import {TestCreateComponent} from './component/test/test-create/test-create.component';
import {TopicTestCreateComponent} from './component/topic-test/topic-test-create/topic-test-create.component';
import {TopicTestComponent} from './component/topic-test/topic-test/topic-test.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoginComponent} from "./component/user/login/login.component";
import {RegisterComponent} from "./component/admin/register/register.component";
import {UserDetailComponent} from "./component/user/user-detail/user-detail.component";
import {SnackbarComponent} from "./component/share/snackbar/snackbar.component";
import {TitleComponent} from "./component/share/title/title.component";
import {FooterComponent} from "./component/share/footer/footer.component";
import {HeaderComponent} from "./component/share/header/header.component";
import {AdminPageComponent} from './component/admin/admin-page/admin-page.component';
import {MatMenuModule} from "@angular/material/menu";
import {SummaryComponent} from './component/user/summary/summary.component';
import {TuitionComponent} from './component/user/tuition/tuition.component';
import {SendBillComponent} from './component/admin/send-bill/send-bill.component';
import {LessonPlanComponent} from './component/user/lesson-plan/lesson-plan.component';
import {LessonUpdateComponent} from './component/lesson/lesson-update/lesson-update.component';
import {CourseUpdateComponent} from './component/course/course-update/course-update.component';
import {DepartmentCreateComponent} from './component/admin/department-create/department-create.component';
import {DepartmentPageComponent} from './component/admin/department-page/department-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent,
    CourseCreateComponent,
    CourseDetailComponent,
    CourseListComponent,
    LessonCreateComponent,
    LessonDetailComponent,
    TestCreateComponent,
    TopicTestCreateComponent,
    TopicTestComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    SnackbarComponent,
    TitleComponent,
    AdminPageComponent,
    SummaryComponent,
    TuitionComponent,
    SendBillComponent,
    LessonPlanComponent,
    LessonUpdateComponent,
    CourseUpdateComponent,
    DepartmentCreateComponent,
    DepartmentPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
