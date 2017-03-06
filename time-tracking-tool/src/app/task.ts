import { Project } from './project';
import { Employee } from './employee';
export class Task {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    estimateHours: number;
    spentHours:number;
    remaining:number;
    assignedEmployee?: Employee;
    assignedProject?:Project;
}