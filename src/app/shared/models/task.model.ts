export interface Task {
    id: number;
    text: string;
    done: boolean;
    createdAt: string;
    subtasks: Task[];

    addSubtask: boolean;
    editable: boolean;
}