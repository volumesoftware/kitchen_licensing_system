import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from "../../../../demo/service/product.service";
import { RecipeService } from "../../../service/recipe.service";
import { Recipe } from "../../../api/recipe";
import { s } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'recipe-list',
    templateUrl: 'recipes-list.component.html',
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class RecipesListComponent implements OnInit {

    submitted: boolean = false;

    statuses!: any[];


    //recipes
    recipeDialog: boolean = false;

    recipes: Recipe[] = [];

    recipe!: Recipe;

    selectedRecipes!: Recipe[] | null;


    constructor(private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.initializedData();

        // 'active' | 'expired' | 'revoked' | 'pending' | 'grace_period' | 'trial' | 'canceled'
        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'EXPIRED', value: 'expired' },
            { label: 'REVOKED', value: 'revoked' },
            { label: 'PENDING', value: 'pending' },
            { label: 'GRACE PERIOD', value: 'grace_period' },
            { label: 'TRIAL', value: 'trial' },
            { label: 'CANCELD', value: 'canceld' },
        ];


    }

    initializedData() {
        this.recipeService.getAll().get().subscribe(value => {
            this.recipes = [];
            value.forEach((doc) => {
                let items = { ...doc.data(), ...{ id: doc.id } };
                this.recipes.push(items);
            });
            console.log(this.recipes);
        });
    }

    openNew() {
        this.recipe = {};
        this.submitted = false;
        this.recipeDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.recipes = this.recipes.filter((val) => !this.selectedRecipes?.includes(val));
                this.selectedRecipes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    editProduct(recipe: Recipe) {
        this.recipe = { ...recipe };
        this.recipeDialog = true;
    }

    deleteProduct(recipe: Recipe) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + recipe.recipeName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.recipeService.delete(recipe.id).then(() => {
                    this.recipe = {};
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Deleted',
                        life: 3000
                    });
                    this.initializedData();
                });

            }
        });
    }

    hideDialog() {
        this.recipeDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.recipe.recipeName?.trim()) {
            if (this.recipe.id) {
                this.recipeService.update(this.recipe.id, this.recipe).then(
                    t => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Updated',
                            life: 3000
                        });

                        this.initializedData();
                    }
                );

            } else {
                this.recipeService.create(this.recipe).then(
                    t => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Created',
                            life: 3000
                        });
                        this.initializedData();
                    }
                );

            }

            this.recipes = [...this.recipes];
            this.recipeDialog = false;
            this.recipe = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz123456789';
        for (var i = 0; i < 8; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: 'active' | 'expired' | 'revoked' | 'pending' | 'grace_period' | 'trial' | 'canceled') {
        switch (status) {
            case "grace_period":
                return 'info';
            case "trial":
                return 'info';
            case "canceled":
                return 'info';
            case 'active':
                return 'success';
            case 'expired':
                return 'danger';
            case 'revoked':
                return 'info';
            case 'pending':
                return 'warn';
        }
    }
}
