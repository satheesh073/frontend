import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tcr',
  templateUrl: './tcr.component.html',
  styleUrls: ['./tcr.component.css'],
  providers: [DatePipe],
})
export class TcrComponent {
  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}
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

  private updateLastTxTime() {
    const currentDate = new Date();
    this.lasttxtime = this.datePipe.transform(
      currentDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );
    this.cdr.detectChanges(); // Detect changes to update the view
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

    // Add other necessary variable declarations here

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
                    sequence: [binaryString1], //['0000000000000001']
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
                    sequence: [binaryString3], //['0000000000000001']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 2',
                    sequence: [binaryString2], //['0000000000000000']
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
    const jsonBlob = new Blob([formattedJson], { type: 'application/json' });

    // Creating an element
    const downloadLink = document.createElement('a');

    // Set the download link attributes
    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = 'requestData.json';

    // Append to the body
    document.body.appendChild(downloadLink);

    // Trigger to download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);

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

  showSuccessPopup(): void {
    // Code to show the success popup
    const popup = document.getElementById('popupSection1');
    if (popup) {
      popup.classList.remove('hidden');
    }
  }

  showErrorPopup(message: string): void {
    // Code to show the error popup
    const popup = document.getElementById('popupErrorSection1');
    if (popup) {
      popup.classList.remove('hidden');
    }
  }
  closePopup(): void {
    // Logic to close the popup goes here
    const popupSection = document.getElementById('popupSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // close error popup
  closePopup1(): void {
    // Logic to close the popup goes here
    const popupSection = document.getElementById('popupErrorSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // sentmail
  @ViewChild('popupMailSection') popupMailSection: ElementRef | undefined;

  // ... your other component properties and methods

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
    // Click occurred outside the popup, so close it
    const popupSection = document.getElementById(popupId);
    if (popupSection && !popupSection.contains(event.target as Node)) {
      // Click occurred outside the popup, so close it

      popupSection.classList.add('hidden');
      this.cdr.detectChanges();
    }
  }
}
