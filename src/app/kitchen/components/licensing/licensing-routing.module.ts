import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LicenseListComponent} from "./license-list/license-list.component";
import {LicenseDetailComponent} from "./license-detail/license-detail.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: LicenseListComponent},
        {path: 'detail', component: LicenseDetailComponent},
    ])],
    exports: [RouterModule]
})
export class LicensingRoutingModule {
}
