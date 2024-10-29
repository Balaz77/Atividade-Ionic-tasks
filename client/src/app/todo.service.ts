import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any>{

  };
  addTask(task:any): Observable<any>{

  };
  updateTasks(id: number, task: any): Observable<any>{

  };
  deletedTask(id: number): Observable<any>{

  };
}
