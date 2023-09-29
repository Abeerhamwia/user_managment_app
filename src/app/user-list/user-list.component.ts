import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const page = 1; // Example: Fetch users from the first page
    const url = `https://reqres.in/api/users?page=${page}`;

    this.http.get<any>(url).subscribe(response => {
      this.users = response.data;
    });
  }
}