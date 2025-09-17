import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  email = '';
  password = '';
  passwordConfirm = '';

  submit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.passwordConfirm);
    alert('Sign Up Submitted (simulated)');
  }
}

