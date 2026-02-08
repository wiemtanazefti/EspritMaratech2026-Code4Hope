import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLoginSubmit() {
    console.log('Login attempt:', this.loginData);
  }

  onRegisterSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Register attempt:', this.registerData);
  }

  loginWithGoogle() {
    console.log('Login with Google');
  }

  loginWithFacebook() {
    console.log('Login with Facebook');
  }
}
