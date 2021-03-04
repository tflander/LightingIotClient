import { Component, OnInit } from '@angular/core';
import { DeviceInfo} from '../device-info';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.sass']
})
export class DeviceInfoComponent implements OnInit {

  deviceInfo: DeviceInfo = {
    MacAddress: 'stub mac address',
    IP: 'stub IP',
    Program: 'stub program',
    ProgramVersion: 'stub program version'
  };

  constructor() { }
  ngOnInit(): void {
  }

}
