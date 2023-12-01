/// <reference types="@types/googlemaps" />
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  NgZone,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
declare var google: any;

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.css'],
  providers: [DatePipe],
})
export class TcrComponent {
  searchAddress: string = '';
  autocomplete: google.maps.places.Autocomplete | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private zone: NgZone
  ) {}
  downloadJson: boolean = false;

  value: number = 0;
  isPrimarySystemDropdownOpen = false;
  selectedSystem: string | null = null;

  togglePrimarySystemDropdown() {
    this.isPrimarySystemDropdownOpen = !this.isPrimarySystemDropdownOpen;
  }

  selectSystem(system: string) {
    this.selectedSystem = system;
    this.isPrimarySystemDropdownOpen = false;
  }

  // for reeferselection

  isReeferModeDropdownOpen = false;
  selectedReeferMode: string | null = null;

  toggleReeferModeDropdown() {
    this.isReeferModeDropdownOpen = !this.isReeferModeDropdownOpen;
  }

  selectReeferMode(reeferMode: string) {
    this.selectedReeferMode = reeferMode;
    this.isReeferModeDropdownOpen = false;
  }

  // for alert1
  alert1: boolean[] = Array(16).fill(false);

  updateCheckboxValue(index: number) {
    this.alert1[index] = !this.alert1[index];
  }

  // for alert2
  alert2: boolean[] = Array(16).fill(false);

  updateCheckboxValue1(index: number) {
    this.alert2[index] = !this.alert2[index];
  }

  // for alert3
  alert3: boolean[] = Array(16).fill(false);

  updateCheckboxValue2(index: number) {
    this.alert3[index] = !this.alert3[index];
  }

  // ingress

  isIngressDropdownOpen = false;
  selectedIngress: string | null = null;
  batteryLevel: string | null = null;

  toggleIngressDropdown() {
    this.isIngressDropdownOpen = !this.isIngressDropdownOpen;
  }

  selectIngress(ingress: string) {
    this.selectedIngress = ingress;
    this.isIngressDropdownOpen = false;
  }

  gatewayId: string | null = null;
  deviceId: string | null = null;
  system: string | null = null;
  esn: string | null = null;
  lasttxtime: string | null = null;
  latitude: string | null = null;
  longitude: string | null = null;
  // inventory
  fuellevel: string | null = null;
  // supply
  supplytempmax: string | null = null;
  supplytempmin: string | null = null;
  supplytempmean: string | null = null;
  returntempmax: string | null = null;
  returntempmin: string | null = null;
  returntempmean: string | null = null;

  //Temperature View

  OperationHours: string | null = null;
  ProductSetpoint: string | null = null;
  heater: string | null = null;
  product: string | null = null;
  highpressure: string | null = null;

  //Common

  main: string | null = null;
  phase1: string | null = null;
  phase2: string | null = null;
  phase3: string | null = null;
  perflow: string | null = null;

  // set operation

  OperationHoursS: string | null = null;
  OperationHoursP: string | null = null;
  ambientTemperature: string | null = null;

  automateData() {
    this.selectedIngress = 'TCP';
    this.batteryLevel = '12';

    this.selectedReeferMode = '4';

    this.gatewayId = 'ASSETLINK_TCR_109_001';
    this.deviceId = 'ANANTHI-TCR'; //3654
    this.system = 'HCI';
    this.esn = 'ANANTHI-TCR';
    this.lasttxtime = '';
    this.latitude = '18.98367';
    this.longitude = '29.72933';
    this.updateLastTxTime();

    this.fuellevel = '7';

    this.supplytempmax = '25';
    this.supplytempmin = '25';
    this.supplytempmean = '25';
    this.returntempmax = '25';
    this.returntempmin = '25';
    this.returntempmean = '25';

    this.ambientTemperature = '25';
    this.OperationHoursP = '25';
    this.OperationHoursS = '25';

    this.OperationHours = '200';
    this.ProductSetpoint = '25';
    this.heater = '25';
    this.product = '25';
    this.highpressure = '25';
    this.selectedSystem = 'Cooling';

    this.main = '50';
    this.phase1 = '50';
    this.phase2 = '50';
    this.phase3 = '50';
    this.perflow = '50';
    console.log('Data has been automated!');
  }

  sendData(): void {
    const binaryString1 = this.alert1
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    const binaryString2 = this.alert2
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    const binaryString3 = this.alert3
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');
    // fear start

    // necessary variables

    this.value = this.selectedSystem === 'Cooling' ? 4 : 5;
    console.log(this.value);
    console.log('Reversed Binary string for Alert 3:', binaryString3);
    console.log('Reversed Binary string for Alert 2:', binaryString2);
    console.log('Reversed Binary string for Alert 1:', binaryString1);

    const apiUrl =
      'https://assetiq-dev.rt1cloud.com/reeferiq-api/device-gateway-messages/message-simulator';

    // Define the requestData object
    const requestData = {
      gatewayId: this.gatewayId,
      Moments: [
        {
          deviceid: this.deviceId,
          system: 'HCI',
          esn: this.esn,
          lasttxtime: this.lasttxtime,
          moments: [
            {
              momentid: 99514648,
              dateOriginated: this.lasttxtime,
              dateReported: this.lasttxtime,
              type: '1',
              points: [
                {
                  Point: {
                    Ingress: this.selectedIngress,
                  },
                },
                {
                  Point: {
                    TimeSinceCom: '60.03',
                  },
                },
                {
                  PointMsgType: {
                    num: '7',
                    MsgType: 'Probe 2 High Level',
                  },
                },
                {
                  Point: {
                    CurrentMode: this.selectedReeferMode,
                  },
                },
                {
                  PointLoc: {
                    Lat: this.latitude,
                    Lon: this.longitude,
                  },
                },
                {
                  Point: {
                    Battery: this.batteryLevel + 'V',
                  },
                },
                {
                  Point: {
                    BatteryRaw: this.batteryLevel,
                  },
                },
                {
                  Point: {
                    UnitTemperature: '16C - 23C',
                  },
                },
                {
                  PointSensor: {
                    Num: 0,
                    Name: 'Sensor0',
                    sequence: ['213'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 1,
                    Name: 'REFFER ALARM ON',
                    sequence: ['116'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 2,
                    Name: 'Sensor2',
                    sequence: ['0'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 4,
                    Name: 'T2-PROBE1',
                    sequence: [this.OperationHoursP], //['-26']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 5,
                    Name: 'AMBIENT ',
                    sequence: [this.ambientTemperature], //['50]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 6,
                    Name: 'T3-PROBE2',
                    sequence: [this.OperationHoursS], //['51']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 7,
                    Name: 'Sensor7',
                    sequence: ['30', '5289', '4', '60', '30', '210'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 8,
                    Name: 'Sensor8',
                    sequence: ['0'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 9,
                    Name: 'Sensor9',
                    sequence: ['31', '-32768', '32', '-750', '219', '210'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 10,
                    Name: 'Sensor10',
                    sequence: ['0'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 11,
                    Name: 'Sensor11',
                    sequence: ['0'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T2-PROBE1_max',
                    sequence: [this.supplytempmax], // ['38']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T2-PROBE1_min',
                    sequence: [this.supplytempmin], //['-30']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T2-PROBE1_mean',
                    sequence: [this.supplytempmean], //['23']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T3-PROBE1_max',
                    sequence: [this.returntempmax], //['67']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T3-PROBE1_min',
                    sequence: [this.returntempmin], //['45']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'T3-PROBE1_mean',
                    sequence: [this.returntempmean], // ['37']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Current Phase 2',
                    sequence: [this.phase2], //["3.1 "]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Operation Hour',
                    sequence: [this.OperationHours], //["455.5"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Operation Mode',
                    sequence: [this.value.toString()], //['4]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'MainHZ',
                    sequence: [this.main], //["50.65"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Set Point 2',
                    sequence: ['100'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Product Set Point',
                    sequence: [this.ProductSetpoint], //['30']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 1',
                    sequence: [binaryString1], //['0000000000000001'] binaryString1
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Current Phase 1',
                    sequence: [this.phase1], //["00000000"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'High Pressure',
                    sequence: [this.highpressure], //['30.5'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Current Phase 3',
                    sequence: [this.phase3], //["2.3"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Heater Temperature',
                    sequence: [this.heater], //['150']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Preflow Temperature',
                    sequence: [this.perflow], //["100"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Product Temperature',
                    sequence: [this.product], // ['20']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 3',
                    sequence: [binaryString3], //['0000000000000001'] binaryString3
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 2',
                    sequence: [binaryString2], //['0000000000000000'] binaryString2 ['1111111111111111']
                    enumeration: 'values',
                  },
                },
              ],
              dateReceived: '2023-10-12T17:15:10Z',
            },
          ],
          CLASS: 'AP4i34',
        },
      ],
    };

    const formattedJson = JSON.stringify(requestData, null, 2);

    // Blob for JSON data
    if (this.downloadJson) {
      const jsonBlob = new Blob([formattedJson], { type: 'application/json' });

      // Creating an element
      const downloadLink = document.createElement('a');

      // download link attributes
      downloadLink.href = URL.createObjectURL(jsonBlob);
      downloadLink.download = 'requestData.json';

      // Append to the body
      document.body.appendChild(downloadLink);

      // Trigger to download
      downloadLink.click();

      document.body.removeChild(downloadLink);
    }

    console.log('Data to be sent to API:', requestData);

    axios
      .post(apiUrl, requestData, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Check if the response is successful
        if (response.data === true) {
          this.showSuccessPopup();
          console.log(response.data);
        } else {
          this.showErrorPopup('Unexpected response');
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        this.showErrorPopup('Failed to send data');
      });
    // fear end
  }

  // download Json
  onCheckboxChange(): void {}

  // popups
  showSuccessPopup(): void {
    // Code to show the success popup
    const popup = document.getElementById('popupSection1');
    if (popup) {
      popup.classList.remove('hidden');

      //Timer
      setTimeout(() => {
        popup.classList.add('hidden');
      }, 2000);
    }
  }

  showErrorPopup(message: string): void {
    // Code to show the error popup
    const popup = document.getElementById('popupErrorSection1');
    if (popup) {
      popup.classList.remove('hidden');

      // Timer
      setTimeout(() => {
        popup.classList.add('hidden');
      }, 2000);
    }
  }

  closePopup(): void {
    // Logic to close the popup
    const popupSection = document.getElementById('popupSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // close error popup
  closePopup1(): void {
    // Logic to close the popup
    const popupSection = document.getElementById('popupErrorSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // sentmail and map
  @ViewChild('popupMailSection') popupMailSection: ElementRef | undefined;

  showPopupMail(): void {
    console.log('showPopupMail called');
    if (this.popupMailSection) {
      this.popupMailSection.nativeElement.classList.remove('hidden');
    }
  }

  closePopupMail(): void {
    if (this.popupMailSection) {
      this.popupMailSection.nativeElement.classList.add('hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.closePopupIfOutside('popupSection1', event);
    this.closePopupIfOutside('popupErrorSection1', event);
    this.closePopupIfOutside('popupMailSection', event);
  }

  private closePopupIfOutside(popupId: string, event: Event): void {
    // Click occurred outside the popup
    const popupSection = document.getElementById(popupId);
    if (popupSection && !popupSection.contains(event.target as Node)) {
      popupSection.classList.add('hidden');
      this.cdr.detectChanges();
    }
  }

  // increment time

  private updateLastTxTime() {
    const currentDate = new Date();

    if (this.lasttxtime !== null) {
      const currentDateTime = new Date(this.lasttxtime);
      // Perform additional operations with currentDateTime if needed
    }

    this.lasttxtime = this.datePipe.transform(
      currentDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );
    this.cdr.detectChanges();
  }

  incrementOneMinute() {
    if (this.lasttxtime !== null) {
      const currentDateTime = new Date(this.lasttxtime);
      currentDateTime.setMinutes(currentDateTime.getMinutes() + 1);

      // Update lasttxtime with new value
      this.lasttxtime = this.datePipe.transform(
        currentDateTime,
        'yyyy-MM-ddTHH:mm:ss.SSSZ'
      );
      this.cdr.detectChanges();
    }
  }
  // map

  private marker: google.maps.Marker | null = null;
  private map: google.maps.Map | null = null;

  ngOnInit() {
    this.initMap();
  }

  // initMap() {
  //   const mapDiv = document.getElementById('nmrMapDiv')! as HTMLElement;

  //   const mapOptions = {
  //     center: { lat: 0, lng: 0 },
  //     zoom: 8,
  //   };

  //   this.map = new google.maps.Map(mapDiv, mapOptions);

  //   // Add click event listener to the map
  //   google.maps.event.addListener(
  //     this.map,
  //     'click',
  //     (event: google.maps.MouseEvent) => {
  //       this.updateMarker(event.latLng);
  //     }
  //   );
  // }

  initMap() {
    const mapDiv = document.getElementById('nmrMapDiv')! as HTMLElement;

    const mapOptions = {
      zoom: 8,
    };

    this.map = new google.maps.Map(mapDiv, mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          this.map!.setCenter(userLatLng);
          this.updateMarker(userLatLng);
        },
        (error) => {
          console.error('Error getting current location:', error);
          //To Handle error
          this.handleLocationError();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      //To Handle error
      this.handleLocationError();
    }

    // Click event listener for map
    google.maps.event.addListener(
      this.map,
      'click',
      (event: google.maps.MouseEvent) => {
        this.updateMarker(event.latLng);
      }
    );
  }

  handleLocationError() {
    // show pop up for default location
    const defaultLocation = new google.maps.LatLng(0, 0);
    this.map!.setCenter(defaultLocation);
    this.updateMarker(defaultLocation);
    alert('Unable to retrieve your location. Using default location.');
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }

  performSearch() {
    if (this.searchAddress && this.map) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { address: this.searchAddress },
        (results: any, status: any) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0]?.geometry?.location;

            if (location) {
              this.map!.setCenter(location);
              this.updateMarker(location);
            } else {
              alert('Location information not available.');
            }
          } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
            // Handle zero results, maybe show a message to the user
            alert('No results found for the provided address.');
          } else {
            // Handle other geocoding errors
            alert(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        }
      );
    } else {
      // Use default location if location access is blocked
      const defaultLocation = new google.maps.LatLng(0, 0);
      this.map!.setCenter(defaultLocation);
      this.updateMarker(defaultLocation);
    }
  }

  private updateMarker(latLng: google.maps.LatLng) {
    // Removing previous marker
    if (this.marker) {
      this.marker.setMap(null);
    }

    // Creating new marker
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    // Updating lat and long
    this.latitude = latLng.lat().toString();
    this.longitude = latLng.lng().toString();
  }

  removeMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  // search update
  ngAfterViewInit() {
    // Initialize the autocomplete
    this.initAutocomplete();
  }

  initAutocomplete() {
    const input = document.getElementById('searchInput') as HTMLInputElement;

    if (input && this.map) {
      this.autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'],
      });

      if (this.autocomplete && this.map) {
        this.autocomplete.bindTo('bounds', this.map);
      }

      if (this.autocomplete) {
        this.autocomplete.addListener('place_changed', () => {
          this.zone.run(() => {
            // Check if this.autocomplete is not null
            if (this.autocomplete) {
              const place = this.autocomplete.getPlace();

              if (place.geometry) {
                // Check if this.map is not null
                if (this.map) {
                  this.map!.setCenter(place.geometry.location);
                  this.updateMarker(place.geometry.location);
                }
              } else {
                alert('Location information not available.');
              }
            }
          });
        });
      }
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    console.log('Input changed:', inputValue);
  }
  // for side nav
  @ViewChild('Alert1') reeferModeSection!: ElementRef;
  @ViewChild('constant') constantSection!: ElementRef;
  @ViewChild('temperatureview') temperatureviewSection!: ElementRef;
  @ViewChild('setoperation') setoperationSection!: ElementRef;
  @ViewChild('supply1') supplySection!: ElementRef;
  @ViewChild('common') commonSection!: ElementRef;
  @ViewChild('inventory') inventorySection!: ElementRef;
  @ViewChild('alerts') alertsSection!: ElementRef;

  // ...

  scrollToSection(sectionId: string): void {
    if (sectionId === 'Alert1' && this.reeferModeSection) {
      this.reeferModeSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'constant' && this.constantSection) {
      this.constantSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'temperatureview' && this.temperatureviewSection) {
      this.temperatureviewSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'setoperation' && this.setoperationSection) {
      this.setoperationSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'supply' && this.supplySection) {
      this.supplySection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'common' && this.commonSection) {
      this.commonSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'inventory' && this.inventorySection) {
      this.inventorySection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'alerts' && this.alertsSection) {
      this.alertsSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
}
