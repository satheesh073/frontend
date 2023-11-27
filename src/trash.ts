import { Component } from '@angular/core';
import axios from 'axios';

export class NmrComponent {
  // Declare any necessary variables here

  sendData() {}

  showSuccessPopup() {
    // Implement your success popup logic here
    console.log('Success popup');
  }

  showErrorPopup(message: string) {
    // Implement your error popup logic here
    console.error(message);
  }
}
