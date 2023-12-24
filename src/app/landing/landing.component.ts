import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; // Replace with the correct path to your ApiService

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit  {
  employeeForm: FormGroup;
  
  inpt = "";
  nom = "";
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.employeeForm = this.fb.group({
      // nom: ['', Validators.required],
      cine: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      fileImg: [null]  // This corresponds to the name 'fileImg' in the FormData
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = new FormData();
      
      // Retrieve the file input from the form control
      const fileInput = this.employeeForm.get('fileImg');
      
      // Check if a file is selected
      if (fileInput instanceof File) {
        formData.append('fileImg', fileInput);
      }
  
      formData.append('sauf', new Blob([JSON.stringify(this.employeeForm.value)], { type: 'application/json' }));
  
      this.apiService.createEmployee(formData).subscribe(
        (response: any) => {
          console.log('Employee created successfully:', response);
          // Optionally: Redirect or show a success message
        },
        (error: any) => {
          console.error('Error creating employee:', error);
          // Optionally: Show an error message
        }
      );
  
      // Optionally: You can reset the form here
      this.employeeForm.reset();
    }
  }
  

  ngOnInit(): void {
    // Your initialization logic here
  }
}
