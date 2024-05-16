export type AddTodoType = {
  todo: string;
  completed: boolean;
  userId: number;
};

export type UpdateTodoType = {
  todo?: string;
  completed?: boolean;
  userId: number;
};
export type TodoType = {
  id?: number | null;
  todo?: string;
  completed?: boolean;
  userId?: number;
};

export type AddformType = {
  id?: number | null;
  todo?: string;
  completed?: boolean;
  userId: number;
};
