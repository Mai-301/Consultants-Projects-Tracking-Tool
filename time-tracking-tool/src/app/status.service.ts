import { Injectable } from '@angular/core';
import { Status } from './status';
@Injectable()
export class StatusService {
statuses: Status[];
  constructor() {
    this.statuses = [{ id: 1, name: "Active" }, { id: 2, name: "Finished" }, { id: 3, name: "Freezed" }];
  }
  getStatuses():Status[]{
    return this.statuses;
  }

}
