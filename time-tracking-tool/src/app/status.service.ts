import { Injectable } from '@angular/core';
import { Status } from './status';
@Injectable()
export class StatusService {
statuses: Status[];
  constructor() {
    this.statuses = [{ value: 1, name: "Active" }, { value: 2, name: "Finished" }, { value: 3, name: "Freezed" }];
  }
  getStatuses():Status[]{
    return this.statuses;
  }

}
