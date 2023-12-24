import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8087/employe-api';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createEmployee(formData: FormData): Observable<Employee> {
    const headers = new HttpHeaders();
    // Do not set Content-Type here; let Angular set it automatically for FormData
    // headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<Employee>(this.apiUrl, formData, { headers });
  }
}
