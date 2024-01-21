import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss']
})
export class AddTrackComponent {
  addDataForm: FormGroup;

  constructor(private fb: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addDataForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      genre: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addDataForm.valid) {
      const formData = this.addDataForm.value;
      this.api.addTrack(formData).pipe(finalize(()=>window.location.reload())).subscribe();
      
    }
  }


}
