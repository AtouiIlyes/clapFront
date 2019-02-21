import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning/ng-lightning';

import { SharedModule } from '#app/shared/shared.module';

import { ProceedingsRoutingModule } from './proceedings-routing.module';
import { ProceedingsService } from './proceedings.service';
import { ProceedingsComponent } from './proceedings.component';
import { ProceedingsListComponent } from './proceedings-list/proceedings-list.component';
import { ProceedingsEditComponent } from './proceedings-edit/proceedings-edit.component';
import { ProceedingsDetailComponent } from './proceedings-detail/proceedings-detail.component';
import { ProceedingsProcessComponent } from './proceedings-process/proceedings-process.component';
import { ProceedingsStepComponent } from './proceedings-step/proceedings-step.component';

@NgModule({
  declarations: [
    ProceedingsComponent,
    ProceedingsListComponent,
    ProceedingsEditComponent,
    ProceedingsDetailComponent,
    ProceedingsProcessComponent,
    ProceedingsStepComponent
  ],
  imports: [
    CommonModule,
    ProceedingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NglModule.forRoot()

   ],
   providers: [ProceedingsService]
})
export class ProceedingsModule { }
