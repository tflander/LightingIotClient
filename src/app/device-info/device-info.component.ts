import { Component, OnInit } from '@angular/core';
import { DeviceInfo} from '../device-info';
import { DeviceInfoService} from '../device-info.service';
import { MessageService} from '../message.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.sass']
})

export class DeviceInfoComponent implements OnInit {

  devices: DeviceInfo[] = [];
  tempDebug = '';

  getDevices(): void {

    const devices$ = this.deviceInfoService.getDeviceInfo();
    console.log(this.tempDebug);
    devices$.forEach(deviceInfo$ => deviceInfo$.subscribe((device: DeviceInfo) => {
      this.devices.push(device);
    }));
  }

  constructor(private deviceInfoService: DeviceInfoService) {
    // temp code
    for (let i = 0; i <= 255; i++) {
      this.tempDebug += '\n"/device' + i + '": {';
      this.tempDebug += '  "secure": false,';
      this.tempDebug += '  "pathRewrite": {';
      this.tempDebug += '    "^/device' + i + '": ""';
      this.tempDebug += '  }';
      this.tempDebug += '},';
    }
  }
  ngOnInit(): void {
    this.getDevices();
  }

}
