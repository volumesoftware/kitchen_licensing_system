import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'licensing', loadChildren: () => import('./components/licensing/licensing.module').then(m => m.LicensingModule) },
        { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
        { path: 'ingredients', loadChildren: () => import('./components/ingredient/ingredient.module').then(m => m.IngredientModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class KitchenRoutingModule { }
