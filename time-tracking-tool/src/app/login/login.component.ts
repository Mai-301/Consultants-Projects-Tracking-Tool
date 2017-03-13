import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.user = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      if (value.userName === 'admin' && value.password === 'admin')
        this.router.navigate(['admin']);
      else
        this.router.navigate(['employee']);
    }
  }

  ngOnInit() {
  }

}
