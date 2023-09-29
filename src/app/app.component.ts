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
      // Navigate to the user details page if a search term is entered
      this.router.navigate(['/user', this.search]);
    } else {
      // Redirect to the user list page if the search term is empty
      this.router.navigate(['/users']);
    }
  }
}