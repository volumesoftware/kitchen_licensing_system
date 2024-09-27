import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecipesListComponent },
    ])],
    exports: [RouterModule]
})
export class RecipeRoutingModule {
}
