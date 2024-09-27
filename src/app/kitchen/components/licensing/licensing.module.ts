import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensingRoutingModule } from "./licensing-routing.module";
import { LicenseDetailComponent } from "./license-detail/license-detail.component";
import { LicenseListComponent } from "./license-list/license-list.component";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { RatingModule } from "primeng/rating";
import { RadioButtonModule } from "primeng/radiobutton";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { LicenseService } from "../../service/license.service";
import { CalendarModule } from 'primeng/calendar';
import { TimestampToDatePipe } from '../../directives/timestamp-to-date.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
    declarations: [
        LicenseDetailComponent,
        LicenseListComponent,
        TimestampToDatePipe
    ],
    imports: [
        CommonModule,
        LicensingRoutingModule,
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
        CalendarModule,
        AutoCompleteModule,
    ],
    providers: [MessageService, ConfirmationService, LicenseService]
})
export class LicensingModule {
}
