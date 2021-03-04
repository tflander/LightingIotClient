import { Component, OnInit } from '@angular/core';
import { DeviceInfo} from '../device-info';
import { DEVICES } from '../MockDevices';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.sass']
})
export class DeviceInfoComponent implements OnInit {

  mockDevices = DEVICES;

  constructor() { }
  ngOnInit(): void {
  }

}
