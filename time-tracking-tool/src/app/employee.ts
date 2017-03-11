import { Task } from './task';
export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    role: string;
    tasks: Task[];
    totalWorkDuration: number = 0;
}