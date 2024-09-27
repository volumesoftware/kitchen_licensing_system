import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/kitchen/service/auth-service.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {



    loginForm: FormGroup;

    valCheck: string[] = ['remember'];


    constructor(public layoutService: LayoutService, private authService: AuthService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    login() {
        if (this.loginForm.valid) {
            console.log('Form Submitted!', this.loginForm.value);
            this.authService.login(this.loginForm.value);
        }else{
            console.log('failed to login');
        }
    }
}
