export interface Task {
    id: number;
    text: string;
    done: boolean;
    createdAt: Date;
    subtasks?: Task[];

    addSubtask: boolean;
}