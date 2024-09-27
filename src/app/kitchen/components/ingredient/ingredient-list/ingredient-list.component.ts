import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from "../../../../demo/service/product.service";
import { IngredientService } from "../../../service/ingredient.service";
import { s } from '@fullcalendar/core/internal-common';
import { Ingredients } from 'src/app/kitchen/api/ingredient';

@Component({
    selector: 'ingredient-list',
    templateUrl: 'ingredient-list.component.html',
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class IngredientListComponent implements OnInit {

    submitted: boolean = false;

    statuses!: any[];


    //ingredients
    ingredientDialog: boolean = false;

    ingredients: Ingredients[] = [];

    ingredient!: Ingredients;

    selectedIngredients!: Ingredients[] | null;


    constructor(private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private ingredientService: IngredientService
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
        this.ingredientService.getAll().get().subscribe(value => {
            this.ingredients = [];
            value.forEach((doc) => {
                let items = { ...doc.data(), ...{ id: doc.id } };
                this.ingredients.push(items);
            });
            console.log(this.ingredients);
        });
    }

    openNew() {
        this.ingredient = {};
        this.submitted = false;
        this.ingredientDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ingredients = this.ingredients.filter((val) => !this.selectedIngredients?.includes(val));
                this.selectedIngredients = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    editProduct(ingredient: Ingredients) {
        this.ingredient = { ...ingredient };
        this.ingredientDialog = true;
    }

    deleteProduct(ingredient: Ingredients) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + ingredient.ingredientName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ingredientService.delete(ingredient.id).then(() => {
                    this.ingredient = {};
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
        this.ingredientDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.ingredient.ingredientName?.trim()) {
            if (this.ingredient.id) {
                this.ingredientService.update(this.ingredient.id, this.ingredient).then(
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
                this.ingredientService.create(this.ingredient).then(
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

            this.ingredients = [...this.ingredients];
            this.ingredientDialog = false;
            this.ingredient = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i].id === id) {
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
