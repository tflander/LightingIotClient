import { Component, OnInit } from '@angular/core';
import { DeviceInfo} from '../device-info';
import { DeviceInfoService} from '../device-info.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.sass']
})

export class DeviceInfoComponent implements OnInit {

  devices: DeviceInfo[] = [];

  getDevices(): void {

    const devices$ = this.deviceInfoService.getDeviceInfo();
    devices$.forEach(deviceInfo$ => deviceInfo$.subscribe((device: DeviceInfo) => {
      this.devices.push(device);
    }));
  }

  constructor(private deviceInfoService: DeviceInfoService) {}
  ngOnInit(): void {
    this.getDevices();
  }

}
