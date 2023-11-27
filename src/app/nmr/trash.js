function sendData() {
  const ingress = document.getElementById("ingressInput").value;
  const apiUrl =
    "https://assetiq-dev.rt1cloud.com/reeferiq-api/device-gateway-messages/message-simulator";

  const requestData = {
    gatewayId: gatewayId,
    Moments: [
      {
        deviceid: deviceid,
        system: system,
        esn: esn,
        lasttxtime: lasttxtime,
        moments: [
          {
            momentid: 99499146,
            dateOriginated: lasttxtime,
            dateReported: lasttxtime,
            type: "1",
            points: [
              {
                Point: {
                  SessionStatus: "0",
                },
              },
              {
                Point: {
                  MetaCEP: "19",
                  MetaLat: latitude,
                  MetaLon: longitude,
                },
              },
              {
                Point: {
                  Ingress: ingress,
                },
              },
              {
                Point: {
                  TimeSinceCom: "223.37",
                },
              },
              {
                PointMsgType: {
                  num: "1",
                  MsgType: "sensor report",
                },
              },
              {
                PointAlert: {
                  Level: "1",
                  ModeChange: "10",
                },
              },
              {
                Point: {
                  CurrentMode: selectedModeNumber, //"7"
                },
              },
              {
                PointLoc: {
                  Lat: latitude,
                  Lon: longitude,
                },
              },
              {
                Point: {
                  Battery: batteryLevel + "V",
                },
              },
              {
                Point: {
                  BatteryRaw: batteryLevel,
                },
              },
              {
                Point: {
                  UnitTemperature: "16C - 23C",
                },
              },
              {
                PointSensor: {
                  Num: 0,
                  Name: "Sensor0",
                  sequence: ["142"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 1,
                  Name: "Sensor1",
                  sequence: ["2"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 2,
                  Name: "Fuel Sensor Reading",
                  sequence: [fuelLevel],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 4,
                  Name: "NTC1 - Probe 1",
                  sequence: ["26"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 5,
                  Name: "DIGITAL TEMP",
                  sequence: [ambientTemperatureInput], //["45"] ambientTemperatureInput
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 6,
                  Name: "NTC2 - Probe 2",
                  sequence: ["30"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 7,
                  Name: "Sensor7",
                  sequence: [
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                  ],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 8,
                  Name: "Sensor8",
                  sequence: ["-32647", "-32647"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 9,
                  Name: "Sensor9",
                  sequence: [
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                    "-32647",
                  ],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 10,
                  Name: "Sensor10",
                  sequence: ["-32647", "-32647"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Num: 11,
                  Name: "Sensor11",
                  sequence: ["-32647", "-32647"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC1-MAX",
                  sequence: [supplyTempMax], //["-30"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC1-MIN",
                  sequence: [supplyTempMin], //["-40"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC1-MEAN",
                  sequence: [supplyTempMean], //["-20"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC2-MAX",
                  sequence: [returnTempMax], //["56"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC2-MIN",
                  sequence: [returnTempMin], //["22"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "NTC2-MEAN",
                  sequence: [returnTempMean], //["20"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Main HZ",
                  sequence: ["20"],
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Operation hour",
                  sequence: [operationHoursSInput], //["234"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Operation Mode",
                  sequence: [modeValue1], //["5"] operationModeSInput
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Return Temperature Probe",
                  sequence: [returnTemperatureInput1], //["3.2"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Supply Temperature Probe ",
                  sequence: [supplyTemperatureInput1], //["6.5"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 2 Temperature Setpoint",
                  sequence: [setPointTemperatureInput1], //["0.5"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "Active Errors 1",
                  sequence: [reversedAlert1.join("")], // [alert1] ["0000000000000001"] [reversedAlert1.join("")] [12] [Low current on heat element]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 Operation hour",
                  sequence: [operationHoursPInput], //["611"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 System indication",
                  sequence: [primarySystem], //primarySystem ["2"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 Operation Mode",
                  sequence: [modeValue], // ["5"] operationModePInput
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 Return Temperature Probe",
                  sequence: [returnTemperatureInput], //["23"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 Supply Temperature Probe",
                  sequence: [supplyTemperatureInput], //["10"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "System 1 Temperature Setpoint",
                  sequence: [setPointTemperatureInput], //["30"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "Active Errors 3",
                  sequence: [reversedAlert2.join("")], //["000000000001000"] [reversedAlert2.join("")] ["43"] ["Heat element temp too high"]
                  enumeration: "values",
                },
              },
              {
                PointSensor: {
                  Name: "Active Errors 2",
                  sequence: [reversedAlert.join("")], //["0000000000000001"]  [reversedAlert.join("")] [20,28] [Different current on heat element, Float switch failure]
                  enumeration: "values",
                },
              },
            ],
            dateReceived: "2023-10-12T10:08:04Z",
          },
        ],
        CLASS: "AP4i34",
      },
    ],
  };

  const formattedJson = JSON.stringify(requestData, null, 2);

  // Blob for JSON data
  const jsonBlob = new Blob([formattedJson], { type: "application/json" });

  // Creating an element
  const downloadLink = document.createElement("a");

  // Set the download link attributes
  downloadLink.href = URL.createObjectURL(jsonBlob);
  downloadLink.download = "requestData.json";

  // Append to the body
  document.body.appendChild(downloadLink);

  // Trigger to download
  downloadLink.click();

  // Remove the link from the body
  document.body.removeChild(downloadLink);

  console.log("Data to be sent to API:", requestData);

  axios
    .post(apiUrl, requestData, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Check if the response is successful
      if (response.data === true) {
        showSuccessPopup();
        console.log(response.data);
      } else {
        showErrorPopup("Unexpected response");
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      showErrorPopup("Failed to send data");
    });
}
