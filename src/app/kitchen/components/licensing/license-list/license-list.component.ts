import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LicenseService } from "../../../service/license.service";
import { License } from "../../../api/license";
import { s } from '@fullcalendar/core/internal-common';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

export interface LabelValue {
    label: string;
    value: string;
}

@Component({
    selector: 'license-list',
    templateUrl: 'license-list.component.html',
    styles: [
        `:host ::ng-deep .p-dialog .license-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class LicenseListComponent implements OnInit {

    submitted: boolean = false;

    statuses!: any[];


    //licenses
    licenseDialog: boolean = false;

    licenses: License[] = [];

    license: License = { dailyTimeout: { hour: 0, minute: 0 } };

    selectedLicenses!: License[] | null;


    // emails
    selectedEmail: LabelValue;

    filteredEmails: LabelValue[] | undefined;

    emails: LabelValue[] | undefined;


    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private licenseService: LicenseService
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

    filterItems(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: LabelValue[] = [];
        let query = event.query;
        console.log(this.emails);

        for (let i = 0; i < this.emails.length; i++) {
            let item = this.emails[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }

        }

        this.filteredEmails = filtered;
    }


    initializedData() {
        this.licenseService.getAll().get().subscribe(value => {
            this.licenses = [];
            value.forEach((doc) => {
                let items = {
                    ...doc.data(),
                    ...{
                        id: doc.id,
                        expiryDate: doc.data().expiryDate?.toDate(),
                    }
                };
                this.licenses.push(items);
            });
        });
    }

    openNew() {
        this.license ={ dailyTimeout: { hour: 0, minute: 0 } };
        this.submitted = false;
        this.licenseDialog = true;
    }

    deleteSelectedLicenses() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected licenses?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.licenses = this.licenses.filter((val) => !this.selectedLicenses?.includes(val));
                this.selectedLicenses = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Licenses Deleted',
                    life: 3000
                });
            }
        });
    }

    editLicense(license: License) {
        this.license = { ...license };
        this.licenseDialog = true;
    }

    deleteLicense(license: License) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + license.licenseId + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.licenseService.delete(license.id).then(() => {
                    this.license = {};
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'License Deleted',
                        life: 3000
                    });
                    this.initializedData();
                });

            }
        });
    }

    hideDialog() {
        this.licenseDialog = false;
        this.submitted = false;
    }

    saveLicense() {
        this.submitted = true;

        console.log(this.license);
        if (this.license.computerSerialNo?.trim()) {
            if (this.license.id) {
                this.licenseService.update(this.license.id, this.license).then(
                    t => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'License Updated',
                            life: 3000
                        });
                        this.initializedData();
                    }
                );

            } else {
                this.license.licenseId = this.createId();
                this.licenseService.create(this.license).then(
                    t => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'License Created',
                            life: 3000
                        });
                        this.initializedData();
                    }
                );

            }

            this.licenses = [...this.licenses];
            this.licenseDialog = false;
            this.license = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.licenses.length; i++) {
            if (this.licenses[i].id === id) {
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
