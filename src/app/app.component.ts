import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.search) {
      // Redirect to the user details if a search entered
      this.router.navigate(['/user', this.search]);
    } else {
      // Redirect to the user list if the search empty
      this.router.navigate(['/users']);
    }
  }
}