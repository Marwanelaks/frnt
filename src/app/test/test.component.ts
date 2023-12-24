import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  Nom: any;
  Cin: any;
  Email: any;
  Phone: any;
  Img: any;
  data: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }

  loadData(): void {
    this.httpClient.get<any[]>('http://localhost:8087/employe-api')
      .subscribe(response => {
        this.data = response;
      });
  }

  HandleSub(event: Event): void {
    event.preventDefault();
  
    const data = {
      nom: this.Nom,
      cine: this.Cin,
      email: this.Email,
      phone: this.Phone
    };
  
    const formData = new FormData();
    formData.append('sauf', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('fileImg', this.Img);
  
    // Ajouter une pause courte avant la soumission du formulaire
    setTimeout(() => {
      this.httpClient.post('http://localhost:8087/employe-api', formData)
        .subscribe(
          (response) => {
            // Gérer la réponse comme nécessaire
            console.log(response);
          },
          (error) => {
            // Gérer les erreurs
            console.error(error);
          }
        );
    }, 100);
  }
  

  handleFileInput(event: any): void {
    this.Img = event.target.files[0];
  }

  updateData(id: number): void {
    // Implement the logic to update data by id
    // Similar to the create functionality
  }

  deleteData(id: number): void {
    this.httpClient.delete(`http://localhost:8087/employe-api/${id}`)
      .subscribe(
        () => {
          console.log(`Data with id ${id} deleted.`);
          // Refresh the data after successful deletion
          this.loadData();
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
