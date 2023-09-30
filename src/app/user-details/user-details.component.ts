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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const cachedUser = this.cacheService.get(`user-${id}`);
      if (cachedUser) {
        this.user = cachedUser;
      } else {
        this.fetchUsersDetails(id);
      }
    }
  }

  fetchUsersDetails(id: string): void {
    this.isLoading = true;

    setTimeout(() => {
      const url = `${environment.apiBaseUrl}/users/${id}`;
      this.http.get<any>(url).subscribe(response => {
        this.user = response.data;
        this.cacheService.set(`user-${id}`, this.user);
        this.isLoading = false;
      });
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
