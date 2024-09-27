import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LicenseService } from '../../service/license.service';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';


@NgModule({
  declarations: [
    IngredientListComponent
  ],
  imports: [
    CommonModule,
    IngredientRoutingModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    TagModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  providers: [MessageService, ConfirmationService, LicenseService]
})
export class IngredientModule { }
