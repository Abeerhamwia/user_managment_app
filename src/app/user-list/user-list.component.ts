import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CacheService } from '../cache.service';

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  currentPage: number = 1; // Initial page
  totalPages: number = 0;

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  ngOnInit(): void {
    const cachedUsers = this.cacheService.get('users');
    if (cachedUsers) {
      this.users = cachedUsers;
    } else {
      this.fetchUsers();
    }
  }

  fetchUsers(): void {
    this.isLoading = true;

    const url = `${environment.apiBaseUrl}/users?page=${this.currentPage}`;

    this.http.get<any>(url).subscribe(response => {
      this.users = response.data;
      this.totalPages = response.total_pages;
      this.cacheService.set('users', this.users);
      this.isLoading = false;
    });
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; 
      this.fetchUsers();
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--; 
      this.fetchUsers();
    }
  }
}
