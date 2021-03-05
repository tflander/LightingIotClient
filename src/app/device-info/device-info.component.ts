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

  // TODO: want to handle a list of devices
  // devices: DeviceInfo[] = [];
  device: DeviceInfo = {
    MacAddress: '',
    IP: '',
    Program: '',
    ProgramVersion: '',
  };

  /*
  getDevices(): void {
    this.deviceInfoService.getDeviceInfo()
      .subscribe(devices => this.devices = devices);
  }
   */

  getDevice(): void {
    this.deviceInfoService.getDeviceInfo()
      .subscribe(device => this.device = device);
  }

  constructor(private deviceInfoService: DeviceInfoService) { }
  ngOnInit(): void {
    // this.getDevices();
    this.getDevice();
  }

}
