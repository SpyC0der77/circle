import { groupTasksByStatus, Task, tasks as mockTasks } from '@/mock-data/tasks';
import { LabelInterface } from '@/mock-data/labels';
import { Priority } from '@/mock-data/priorities';
import { Status } from '@/mock-data/status';
import { User } from '@/mock-data/users';
import { create } from 'zustand';

interface FilterOptions {
   status?: string[];
   assignee?: string[];
   priority?: string[];
   labels?: string[];
}

interface TasksState {
   // Data
   tasks: Task[];
   tasksByStatus: Record<string, Task[]>;

   //
   getAllTasks: () => Task[];

   // Actions
   addTask: (task: Task) => void;
   updateTask: (id: string, updatedTask: Partial<Task>) => void;
   deleteTask: (id: string) => void;

   // Filters
   filterByStatus: (statusId: string) => Task[];
   filterByPriority: (priorityId: string) => Task[];
   filterByAssignee: (userId: string | null) => Task[];
   filterByLabel: (labelId: string) => Task[];
   searchTasks: (query: string) => Task[];
   filterTasks: (filters: FilterOptions) => Task[];

   // Status management
   updateTaskStatus: (taskId: string, newStatus: Status) => void;

   // Priority management
   updateTaskPriority: (taskId: string, newPriority: Priority) => void;

   // Assignee management
   updateTaskAssignee: (taskId: string, newAssignee: User | null) => void;

   // Labels management
   addTaskLabel: (taskId: string, label: LabelInterface) => void;
   removeTaskLabel: (taskId: string, labelId: string) => void;

   // Utility functions
   getTaskById: (id: string) => Task | undefined;
}

export const useTasksStore = create<TasksState>((set, get) => ({
   // Initial state
   tasks: mockTasks.sort((a, b) => b.rank.localeCompare(a.rank)),
   tasksByStatus: groupTasksByStatus(mockTasks),

   //
   getAllTasks: () => get().tasks,

   // Actions
   addTask: (task: Task) => {
      set((state) => {
         const newTasks = [...state.tasks, task];
         return {
            tasks: newTasks,
            tasksByStatus: groupTasksByStatus(newTasks),
         };
      });
   },

   updateTask: (id: string, updatedTask: Partial<Task>) => {
      set((state) => {
         const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
         );

         return {
            tasks: newTasks,
            tasksByStatus: groupTasksByStatus(newTasks),
         };
      });
   },

   deleteTask: (id: string) => {
      set((state) => {
         const newTasks = state.tasks.filter((task) => task.id !== id);
         return {
            tasks: newTasks,
            tasksByStatus: groupTasksByStatus(newTasks),
         };
      });
   },

   // Filters
   filterByStatus: (statusId: string) => {
      return get().tasks.filter((task) => task.status.id === statusId);
   },

   filterByPriority: (priorityId: string) => {
      return get().tasks.filter((task) => task.priority.id === priorityId);
   },

   filterByAssignee: (userId: string | null) => {
      if (userId === null) {
         return get().tasks.filter((task) => task.assignee === null);
      }
      return get().tasks.filter((task) => task.assignee?.id === userId);
   },

   filterByLabel: (labelId: string) => {
      return get().tasks.filter((task) => task.labels.some((label) => label.id === labelId));
   },
   searchTasks: (query: string) => {
      const lowerCaseQuery = query.toLowerCase();
      return get().tasks.filter(
         (task) =>
            task.title.toLowerCase().includes(lowerCaseQuery) ||
            task.identifier.toLowerCase().includes(lowerCaseQuery)
      );
   },

   filterTasks: (filters: FilterOptions) => {
      let filteredTasks = get().tasks;

      // Filter by status
      if (filters.status && filters.status.length > 0) {
         filteredTasks = filteredTasks.filter((task) =>
            filters.status!.includes(task.status.id)
         );
      }

      // Filter by assignee
      if (filters.assignee && filters.assignee.length > 0) {
         filteredTasks = filteredTasks.filter((task) => {
            if (filters.assignee!.includes('unassigned')) {
               // If 'unassigned' is selected and the task has no assignee
               if (task.assignee === null) {
                  return true;
               }
            }
            // Check if the task's assignee is in the selected assignees
            return task.assignee && filters.assignee!.includes(task.assignee.id);
         });
      }

      // Filter by priority
      if (filters.priority && filters.priority.length > 0) {
         filteredTasks = filteredTasks.filter((task) =>
            filters.priority!.includes(task.priority.id)
         );
      }

      // Filter by labels
      if (filters.labels && filters.labels.length > 0) {
         filteredTasks = filteredTasks.filter((task) =>
            task.labels.some((label) => filters.labels!.includes(label.id))
         );
      }

      return filteredTasks;
   },

   // Status management
   updateTaskStatus: (taskId: string, newStatus: Status) => {
      get().updateTask(taskId, { status: newStatus });
   },

   // Priority management
   updateTaskPriority: (taskId: string, newPriority: Priority) => {
      get().updateTask(taskId, { priority: newPriority });
   },

   // Assignee management
   updateTaskAssignee: (taskId: string, newAssignee: User | null) => {
      get().updateTask(taskId, { assignee: newAssignee });
   },

   // Labels management
   addTaskLabel: (taskId: string, label: LabelInterface) => {
      const task = get().getTaskById(taskId);
      if (task) {
         const updatedLabels = [...task.labels, label];
         get().updateTask(taskId, { labels: updatedLabels });
      }
   },

   removeTaskLabel: (taskId: string, labelId: string) => {
      const task = get().getTaskById(taskId);
      if (task) {
         const updatedLabels = task.labels.filter((label) => label.id !== labelId);
         get().updateTask(taskId, { labels: updatedLabels });
      }
   },

   // Utility functions
   getTaskById: (id: string) => {
      return get().tasks.find((task) => task.id === id);
   },
}));
