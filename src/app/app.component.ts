import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isDropdownOpen = false;
  selectedAssetType: string | null = null;
  showNmrComponent = true;
  url: any;
  password: string | null = null;
  isPasswordPromptVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize showNmrComponent
    this.updateShowComponent(this.router.url);
    this.showPasswordPrompt();

    //route to updating showNmrComponent
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateShowComponent(event.url);
      }
    });
  }

  showPasswordPrompt(): void {
    const enteredPassword = prompt('Enter the password:');

    // Check if the entered password is correct
    if (enteredPassword === 'hydra2023') {
      this.password = enteredPassword;
      this.initializeApp();
    } else {
      alert('Incorrect password. Please refresh the page and try again.');
      this.showPasswordPrompt();
    }
  }

  initializeApp(): void {
    // Initialize showNmrComponent
    this.updateShowComponent(this.router.url);

    // route to updating showNmrComponent
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateShowComponent(event.url);
      }
    });
  }

  updateShowComponent(url: string) {
    // route contains 'nmr' or 'tcr'
    this.showNmrComponent = !url.includes('/nmr') && !url.includes('/tcr');
  }

  toggleDropdown() {
    if (this.isPasswordCorrect()) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  isPasswordCorrect(): boolean {
    return this.password === 'hydra2023';
  }

  selectAssetType(assetType: string) {
    if (this.isPasswordCorrect()) {
      this.selectedAssetType = assetType;
      this.isDropdownOpen = false;

      if (assetType === 'NMR') {
        this.router.navigate(['/nmr']);
      } else if (assetType === 'TCR') {
        this.router.navigate(['/tcr']);
      } else {
        this.router.navigate(['/default']);
      }
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  @ViewChild('notificationDropdown') notificationDropdown!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;

  @HostListener('document:click', ['$event'])
  closeDropdownIfOutside(event: Event): void {
    const dropdown = this.dropdown.nativeElement;
    const notificationDropdown = this.notificationDropdown.nativeElement;

    if (
      !dropdown.contains(event.target as Node) &&
      !notificationDropdown.contains(event.target as Node)
    ) {
      dropdown.classList.add('hidden');
      notificationDropdown.classList.add('hidden');
    }
  }

  toggleNotificationDropdown(event: Event): void {
    event.stopPropagation(); // Prevent the document click event from being triggered
    const dropdown = this.notificationDropdown.nativeElement;

    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  }

  showNoNotification(): void {
    // "No Notification" link
  }
  toggleDropdown1(event: Event): void {
    event.stopPropagation();
    const dropdown = this.dropdown.nativeElement;

    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  }

  logout(): void {
    const confirmation = confirm('Are you sure you want to log out?');

    if (confirmation) {
      // Perform any additional logout logic if needed

      alert('You logged out successfully');

      // Show the password prompt after successful logout
      this.showPasswordPrompt();
    }
  }
}
