import { Project } from './project';
export class Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    estimate: number;
    spent: number;
    remaining: number;
    assignedProjectID: number;
}