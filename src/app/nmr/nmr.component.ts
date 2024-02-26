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
  selector: 'app-nmr',
  templateUrl: './nmr.component.html',
  styleUrls: ['./nmr.component.css'],
  providers: [DatePipe],
})
export class NmrComponent {
  searchAddress: string = '';
  autocomplete: google.maps.places.Autocomplete | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private zone: NgZone
  ) {}
  downloadJson: boolean = false;

  isPrimarySystemDropdownOpen = false;
  selectedSystem: string | null = null;

  togglePrimarySystemDropdown() {
    this.isPrimarySystemDropdownOpen = !this.isPrimarySystemDropdownOpen;
  }

  selectSystem(system: string) {
    this.selectedSystem = system;
    this.isPrimarySystemDropdownOpen = false;
  }

  // forOperationP

  value: number = 0;
  isOperationModeDropdownOpen = false;
  selectedOperationModeP: string | null = null;

  // Function to toggle the operation mode dropdown
  toggleOperationModeDropdown() {
    this.isOperationModeDropdownOpen = !this.isOperationModeDropdownOpen;
  }

  // Function to select the operation mode
  selectOperationMode(operationMode: string) {
    this.selectedOperationModeP = operationMode;
    this.isOperationModeDropdownOpen = false;
  }

  // forOperationS
  value1: number = 0;
  isOperationModeDropdownOpenS = false;
  selectedOperationModeS: string | null = null;

  toggleOperationModeDropdown1() {
    this.isOperationModeDropdownOpenS = !this.isOperationModeDropdownOpenS;
  }

  selectOperationModeS(operationMode: string) {
    this.selectedOperationModeS = operationMode;
    this.isOperationModeDropdownOpenS = false;
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

  // send button
  sendData(): void {
    const binaryString1 = this.alert1
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // reversed binary string for Alert 1
    console.log('Reversed Binary string for Alert 1:', binaryString1);
    this.value = this.selectedOperationModeP === 'Cooling' ? 4 : 5;
    console.log(this.value);
    this.value1 = this.selectedOperationModeS === 'Cooling' ? 4 : 5;
    console.log(this.value1);

    const binaryString2 = this.alert2
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // reversed binary string for Alert 2
    console.log('Reversed Binary string for Alert 2:', binaryString2);
    const binaryString3 = this.alert3
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // reversed binary string for Alert 2
    console.log('Reversed Binary string for Alert 3:', binaryString3);

    // fear start

    const apiUrl =
      'https://assetiq-test.rt1cloud.com/reeferiq-api/device-gateway-messages/message-simulator';

    // Define the requestData object
    const requestData = {
      gatewayId: this.gatewayId,
      Moments: [
        {
          deviceid: this.deviceId,
          system: this.system,
          esn: this.esn,
          lasttxtime: this.lasttxtime,
          moments: [
            {
              momentid: 99499146,
              dateOriginated: this.lasttxtime,
              dateReported: this.lasttxtime,
              type: '1',
              points: [
                {
                  Point: {
                    SessionStatus: '0',
                  },
                },
                {
                  Point: {
                    MetaCEP: '19',
                    MetaLat: '53.01230000246',
                    MetaLon: '8.75523348438',
                  },
                },
                {
                  Point: {
                    Ingress: this.selectedIngress,
                  },
                },

                {
                  Point: {
                    TimeSinceCom: '223.37',
                  },
                },
                {
                  PointMsgType: {
                    num: '10',
                    MsgType: 'Reefer POWER Off - BEGIN 48HR MODE',
                  },
                },
                {
                  PointAlert: {
                    Level: '1',
                    ModeChange: '10',
                  },
                },
                {
                  Point: {
                    CurrentMode: this.selectedReeferMode, //'7
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
                    sequence: ['142'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 1,
                    Name: 'Sensor1',
                    sequence: ['2'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 2,
                    Name: 'Fuel Sensor Reading',
                    sequence: [this.fuellevel],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 4,
                    Name: 'NTC1 - Probe 1',
                    sequence: ['26'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 5,
                    Name: 'DIGITAL TEMP',
                    sequence: [this.ambientTemperature], //["45"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 6,
                    Name: 'NTC2 - Probe 2',
                    sequence: ['30'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 7,
                    Name: 'Sensor7',
                    sequence: [
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                    ],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 8,
                    Name: 'Sensor8',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 9,
                    Name: 'Sensor9',
                    sequence: [
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                    ],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 10,
                    Name: 'Sensor10',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 11,
                    Name: 'Sensor11',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MAX',
                    sequence: [this.supplytempmax], //["-30"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MIN',
                    sequence: [this.supplytempmin], //["-40"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MEAN',
                    sequence: [this.supplytempmean], //["-20"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MAX',
                    sequence: [this.returntempmax], //["-56"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MIN',
                    sequence: [this.returntempmin], //["-22"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MEAN',
                    sequence: [this.returntempmean], //["-20"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Main HZ',
                    sequence: ['20'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Operation hour',
                    sequence: [this.OperationHoursS], //["234"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Operation Mode',
                    sequence: [this.value.toString()],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Return Temperature Probe',
                    sequence: [this.returnpointS], //["3.2"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Supply Temperature Probe ',
                    sequence: [this.supplypointS], //["6.5"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Temperature Setpoint',
                    sequence: [this.setpointS], //["0.5"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 1',
                    sequence: [binaryString1], //'0000000000000001'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Operation hour',
                    sequence: [this.OperationHoursP], //["611"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 System indication',
                    sequence: [this.selectedSystem], //primarySystem ["2"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Operation Mode',
                    sequence: [this.value1.toString()],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Return Temperature Probe',
                    sequence: [this.returnpointP], //'23'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Supply Temperature Probe',
                    sequence: [this.supplypointP], //['10]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Temperature Setpoint',
                    sequence: [this.setpointP], //['30']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 3',
                    sequence: [binaryString3], //'0000000000001000'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 2',
                    sequence: [binaryString2], //'0000000000000001'
                    enumeration: 'values',
                  },
                },
              ],
              dateReceived: '2023-10-12T10:08:04Z',
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
  onCheckboxChange(): void {
    // To Handle checkbox
  }

  showSuccessPopup(): void {
    // Code to show the success popup
    const popup = document.getElementById('popupSection1');
    if (popup) {
      popup.classList.remove('hidden');

      // Timer
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

  // close success popup
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

  // sentmail
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

  // automate button

  // supply

  supplytempmax: string | null = null;
  supplytempmin: string | null = null;
  supplytempmean: string | null = null;
  returntempmax: string | null = null;
  returntempmin: string | null = null;
  returntempmean: string | null = null;
  // inventory
  fuellevel: string | null = null;
  // common
  setpointP: string | null = null;
  returnpointP: string | null = null;
  supplypointP: string | null = null;
  setpointS: string | null = null;
  returnpointS: string | null = null;
  supplypointS: string | null = null;

  // data
  gatewayId: string | null = null;
  deviceId: string | null = null;
  system: string | null = null;
  esn: string | null = null;
  lasttxtime: string | null = null;
  latitude: string | null = null;
  longitude: string | null = null;

  // set operation

  OperationHoursS: string | null = null;
  OperationHoursP: string | null = null;
  ambientTemperature: string | null = null;

  automateData() {
    this.selectedIngress = 'TCP';
    this.batteryLevel = '12';
    this.supplytempmax = '25';
    this.supplytempmin = '25';
    this.supplytempmean = '25';
    this.returntempmax = '25';
    this.returntempmin = '25';
    this.returntempmean = '25';
    this.fuellevel = '8';
    this.setpointP = '25';
    this.setpointS = '25';
    this.supplypointP = '25';
    this.supplypointS = '25';
    this.returnpointP = '25';
    this.returnpointS = '25';
    this.selectedSystem = 'System1';
    this.gatewayId = 'ASSETLINK_NMR_262_001';
    this.deviceId = 'H8-TEST-NMR';
    this.system = 'HCI';
    this.esn = 'H8-TEST-NMR';
    this.lasttxtime = '';
    this.latitude = '18.98367';
    this.longitude = '29.72933';
    this.selectedOperationModeP = 'Cooling';
    this.selectedOperationModeS = 'Heating';
    this.ambientTemperature = '25';
    this.OperationHoursP = '25';
    this.OperationHoursS = '25';
    this.selectedReeferMode = '4';
    this.updateLastTxTime();

    console.log('Data has been automated!');
  }

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

      // Update lasttxtime with the new value
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

  //   // Add a click event listener to the map
  //   google.maps.event.addListener(
  //     this.map,
  //     'click',
  //     (event: google.maps.MouseEvent) => {
  //       this.updateMarker(event.latLng);
  //     }
  //   );
  // }

  // initMap() {
  //   const mapDiv = document.getElementById('nmrMapDiv')! as HTMLElement;

  //   const mapOptions = {
  //     zoom: 8,
  //   };

  //   this.map = new google.maps.Map(mapDiv, mapOptions);

  //   // Get user's current location using Geolocation API
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const userLatLng = new google.maps.LatLng(
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );

  //         this.map!.setCenter(userLatLng);
  //         this.updateMarker(userLatLng);
  //       },
  //       (error) => {
  //         console.error('Error getting current location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }

  //   // Add a click event listener to the map
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
          //To  Handle error
          this.handleLocationError();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      //To Handle error
      this.handleLocationError();
    }

    // click event listener for map
    google.maps.event.addListener(
      this.map,
      'click',
      (event: google.maps.MouseEvent) => {
        this.updateMarker(event.latLng);
      }
    );
  }

  handleLocationError() {
    // default location or show a message to the user
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
    // Removeing previous marker
    if (this.marker) {
      this.marker.setMap(null);
    }

    // Createing new one
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
  @ViewChild('supply') supplySection!: ElementRef;
  @ViewChild('utilization') utilizationSection!: ElementRef;
  @ViewChild('inventory') inventorySection!: ElementRef;
  @ViewChild('alerts') alertsSection!: ElementRef;

  // ...

  scrollToSection(sectionId: string): void {
    if (sectionId === 'Alert1' && this.reeferModeSection) {
      this.reeferModeSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (sectionId === 'constant' && this.constantSection) {
      this.constantSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
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
    } else if (sectionId === 'utilization' && this.utilizationSection) {
      this.utilizationSection.nativeElement.scrollIntoView({
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
