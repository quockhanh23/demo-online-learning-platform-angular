import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestComponent} from './test/test.component';
import {DialogComponent} from './dialog/dialog.component';
import {MaterialModule} from "./material/material.module";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CourseCreateComponent} from './course/course-create/course-create.component';
import {CourseDetailComponent} from './course/course-detail/course-detail.component';
import {CourseListComponent} from './course/course-list/course-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LessonCreateComponent } from './lesson/lesson-create/lesson-create.component';
import { LessonDetailComponent } from './lesson/lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    DialogComponent,
    HeaderComponent,
    FooterComponent,
    CourseCreateComponent,
    CourseDetailComponent,
    CourseListComponent,
    LessonCreateComponent,
    LessonDetailComponent,
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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
