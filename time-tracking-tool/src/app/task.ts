import { Project } from './project';
import { Employee } from './employee';
export class Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    estimate: number;
    spent: number;
    remaining: number;
    assignedEmployee: Employee;
    assignedProject: Project;
}