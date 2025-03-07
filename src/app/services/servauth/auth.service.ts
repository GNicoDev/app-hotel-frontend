import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; 
   private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.loggedIn.next(true);
    }
   }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { observe: 'response' }).pipe(
      map(response =>{
        const token = response.headers.get('Authorization')
        if (token){
          localStorage.setItem('authToken', token);
          const decodedToken: any = jwtDecode(token);
          localStorage.setItem('username', decodedToken.sub);
          localStorage.setItem('role', decodedToken.role);
          this.loggedIn.next(true);
        }
        return response;
      })
    )
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.loggedIn.next(false); 
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }


  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
