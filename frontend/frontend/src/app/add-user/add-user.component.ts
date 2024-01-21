import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
 public userForm: FormGroup;
public response: {message: string};
  constructor(
    public apiService: ApiService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      login: ['', Validators.required],
      haslo: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', Validators.required],
      czyAdmin: [false] 
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.controls["czyAdmin"].setValue( Number(Boolean(this.userForm.controls["czyAdmin"].value)))
      this.apiService.addUser(this.userForm.value).subscribe(  
      response =>this.response = response,
      error =>this.response = error)
    }
  }
}
