import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: IngredientListComponent},
    ])],
    exports: [RouterModule]
})
export class IngredientRoutingModule {
}
