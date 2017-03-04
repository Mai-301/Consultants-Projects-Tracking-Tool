import { Status } from './status';
export class Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: Status;
    budget: number;
    estimateHours: number;
    assignedTeamLeader: string;
}