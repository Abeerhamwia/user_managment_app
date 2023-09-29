import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchUser(id);
      }
    });
  }

  fetchUser(id: string): void {
    const url = `https://reqres.in/api/users/${id}`;

    this.http.get<any>(url).subscribe(response => {
      this.user = response.data;
    });
  }
}