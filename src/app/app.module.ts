import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogComponent} from './dialog/dialog.component';
import {MaterialModule} from "./material/material.module";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CourseCreateComponent} from './course/course-create/course-create.component';
import {CourseDetailComponent} from './course/course-detail/course-detail.component';
import {CourseListComponent} from './course/course-list/course-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LessonCreateComponent} from './lesson/lesson-create/lesson-create.component';
import {LessonDetailComponent} from './lesson/lesson-detail/lesson-detail.component';
import {TestCreateComponent} from './test/test-create/test-create.component';
import {TopicTestCreateComponent} from './topic-test/topic-test-create/topic-test-create.component';
import {TopicTestComponent} from './topic-test/topic-test/topic-test.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./admin/register/register.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {SnackbarComponent} from "./share/snackbar/snackbar.component";
import {TitleComponent} from "./share/title/title.component";
import {FooterComponent} from "./share/footer/footer.component";
import {HeaderComponent} from "./share/header/header.component";
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import {MatMenuModule} from "@angular/material/menu";

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
    AdminPageComponent
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
