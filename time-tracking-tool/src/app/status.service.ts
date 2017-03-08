import { Injectable } from '@angular/core';
import { Status } from './status';
import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
@Injectable()
export class StatusService {
@LocalStorage('statuses') statuses: Status[];
  constructor() {
    this.statuses = [{ value: 1, name: "Active" }, { value: 2, name: "Finished" }, { value: 3, name: "Freezed" }];
  }
  getStatuses():Status[]{
    return this.statuses;
  }

}
