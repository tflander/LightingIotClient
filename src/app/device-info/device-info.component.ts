import { Component, OnInit } from '@angular/core';
import { DeviceInfo} from '../device-info';
import { DEVICES } from '../MockDevices';
import { DeviceInfoService} from '../device-info.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.sass']
})

export class DeviceInfoComponent implements OnInit {

  devices: DeviceInfo[] = [];
  // device: DeviceInfo = {
  //   MacAddress: '',
  //   IP: '',
  //   Program: '',
  //   ProgramVersion: '',
  // };

  /*
  getDevices(): void {
    this.deviceInfoService.getDeviceInfo()
      .subscribe(devices => this.devices = devices);
  }
   */

  getDevices(): void {

    const devices$ = this.deviceInfoService.getDeviceInfo();
    console.log(devices$);
    devices$.forEach(deviceInfo$ => deviceInfo$.subscribe(x => {
      console.log(x);
      this.devices.push(x);
    }));

    // this.deviceInfoService.getDeviceInfo()
    //   .subscribe(devices => this.devices = devices);
  }

  /*
  getDevice(): void {
    this.deviceInfoService.getDeviceInfo()
      .subscribe(device => this.device = device);
  }
  */


  constructor(private deviceInfoService: DeviceInfoService) { }
  ngOnInit(): void {
    this.getDevices();
    // this.getDevice();
  }

}
