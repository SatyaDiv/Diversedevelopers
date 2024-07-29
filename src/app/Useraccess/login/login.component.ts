import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiservice:ApiService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.http.get<any>("http://localhost:3000/signUpUsers")
      .subscribe(response => {
        const user = response.find((a: any) => {
          return a.email === this.myForm.value.email && a.password === this.myForm.value.password
        });
        if (user) {
          // alert("Login Success");
          this.myForm.reset();
          this.router.navigate(['/home'])
        } else {
          alert("User not found")
        }
      }, error => {
        alert("Something went wrong..")
      })

      if(this.myForm.valid) {
        const email = this.myForm.get('email')?.value;
      const password = this.myForm.get('password')?.value;
      localStorage.setItem('email', email);
      localStorage.setItem('pass',password)
      console.log(this.myForm.value);
      this.router.navigate(['/home'])
      }

  }

}
