import { Task } from './task';
export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    role: string;
    assignedTask: Task;
    totalWorkDuration: number;
}