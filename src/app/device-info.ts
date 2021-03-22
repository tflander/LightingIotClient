import {IColorDuties} from './colorDuties';

export interface DeviceInfo {
  MacAddress: string;
  IP: string;
  Program: string;
  ProgramVersion: string;
  Unused?: string;
  duties?: IColorDuties;
}
