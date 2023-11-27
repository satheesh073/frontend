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

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize showNmrComponent based on the initial route
    this.updateShowComponent(this.router.url);

    // Subscribe to route changes to update showNmrComponent
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateShowComponent(event.url);
      }
    });
  }

  updateShowComponent(url: string) {
    // Check if the current route contains 'nmr' or 'tcr'
    this.showNmrComponent = !url.includes('/nmr') && !url.includes('/tcr');
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectAssetType(assetType: string) {
    this.selectedAssetType = assetType;
    this.isDropdownOpen = false;

    if (assetType === 'NMR') {
      this.router.navigate(['/nmr']);
    } else if (assetType === 'TCR') {
      this.router.navigate(['/tcr']);
    } else {
      this.router.navigate(['/default']);
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
    // Handle the click on "No Notification" link
    // Add your logic here
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
}
