import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  peripheral: any;
  dataFromDevice: any;

  constructor(private ble: BLE) { }

  device = [];
  scan() {
    this.ble.startScan([]).subscribe(dev => {
      dev.forEach(element => {
        this.device.push(element);
      });
      console.log(JSON.stringify(dev));
    })
    setTimeout(() => {
      this.ble.stopScan().then(() => { console.log('scan stopped'); });
    }, 5000);

  }

  connect(deviceId: string) {

    this.ble.connect(deviceId).subscribe(peripheralData => {
      console.log(peripheralData);
      this.peripheral = peripheralData;
    },
      peripheralData => {
        console.log('disconnected');
      });
  }


  read(deviceid, serviceuuid, characteristicuuid) {
    // read data from a characteristic, do something with output data
    this.ble.read(deviceid, serviceuuid, characteristicuuid).then((data) => {
      {
        this.dataFromDevice = data;
        console.log("Hooray we have data" + JSON.stringify(data));
        alert("Successfully read data from device." + JSON.stringify(data));
      }
      (error) => {
        alert("Failed to read characteristic from device.");
      }
    })
  }

  write(activeSensor: boolean, deviceId, serviceUUID, characteristicUUID) {
    // send 1 byte to switch a light on
    const data = new Uint8Array(1);
    if(activeSensor){
      data[0] = 1;
    }else{
      data[0]=0;
    }
    this.ble.write(deviceId,serviceUUID,characteristicUUID,data.buffer).then(
      data => {
        console.log(data);
      }, err=>{
        console.log(err)
      }
    );
  }
}
