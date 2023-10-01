import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CacheService } from '../cache.service';

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = false;
  userNotFound: boolean = false;
  userId: string | null = null; // Public property to store the user ID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      const cachedUser = this.cacheService.get(`user-${this.userId}`);
      if (cachedUser) {
        this.user = cachedUser;
      } else {
        this.fetchUser(this.userId);
      }
    }
  }

  fetchUser(id: string): void {
    this.isLoading = true;

    const url = `${environment.apiBaseUrl}/users/${id}`;
    
    this.http.get<any>(url).subscribe(
      response => {
        this.user = response.data;
        this.cacheService.set(`user-${id}`, this.user);
        this.isLoading = false;

        if (!this.user) {
          this.userNotFound = true;
        }
      },
      error => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
        this.userNotFound = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
