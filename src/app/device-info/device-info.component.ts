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

  getDevices(): void {
    this.devices = this.deviceInfoService.getDeviceInfo();
  }
  constructor(private deviceInfoService: DeviceInfoService) { }
  ngOnInit(): void {
    this.getDevices();
  }

}
