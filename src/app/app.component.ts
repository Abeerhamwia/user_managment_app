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
    if (this.search.trim()) {
      // Redirect to the user details page with the full search string
      this.router.navigate(['/user', this.search]);
    } else {
      // Redirect to the user list page if the search is empty
      this.router.navigate(['/users']);
    }
  }

}
