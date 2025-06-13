import { LexoRank } from '@/lib/utils';
import { LabelInterface, labels } from './labels';
import { Priority, priorities } from './priorities';
import { Status, status } from './status';
import { User, users } from './users';

export interface Task {
   id: string;
   identifier: string;
   title: string;
   description: string;
   status: Status;
   assignee: User | null;
   priority: Priority;
   labels: LabelInterface[];
   createdAt: string;
   subtasks?: string[];
   rank: string;
   dueDate?: string;
}

// generates tasks ranks using LexoRank algorithm.
export const ranks: string[] = [];
const generateTasksRanks = () => {
   const firstRank = new LexoRank('a3c');
   ranks.push(firstRank.toString());
   for (let i = 1; i < 30; i++) {
      const previousRank = LexoRank.from(ranks[i - 1]);
      const currentRank = previousRank.increment();
      ranks.push(currentRank.toString());
   }
};
generateTasksRanks();

export const tasks: Task[] = [
  {
    id: '1',
    identifier: 'LNUI-101',
    title: 'Refactor Button component for full accessibility compliance',
    description: '',
    status: status[2], // completed
    priority: priorities[2],
    assignee: users[0],
    labels: [labels[0]],
    createdAt: '2025-03-08',
    rank: ranks[0],
  },
  {
    id: '2',
    identifier: 'LNUI-204',
    title: 'Optimize animations for smoother UI transitions',
    description: '',
    status: status[0], // to-do
    priority: priorities[1],
    assignee: users[1],
    labels: [labels[1]],
    createdAt: '2025-03-12',
    subtasks: ['1'],
    rank: ranks[1],
  },
  {
    id: '3',
    identifier: 'LNUI-309',
    title: 'Implement dark mode toggle with system preferences support',
    description: '',
    status: status[1], // in-progress
    priority: priorities[1],
    assignee: users[2],
    labels: [labels[2]],
    createdAt: '2025-03-14',
    rank: ranks[2],
  },
];

export function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
   return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      const statusId = task.status.id;

      if (!acc[statusId]) {
         acc[statusId] = [];
      }

      acc[statusId].push(task);

      return acc;
   }, {});
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
   const priorityOrder: Record<string, number> = {
      'urgent': 0,
      'high': 1,
      'medium': 2,
      'low': 3,
      'no-priority': 4,
   };

   return tasks
      .slice()
      .sort(
         (a, b) =>
            priorityOrder[a.priority.id as keyof typeof priorityOrder] -
            priorityOrder[b.priority.id as keyof typeof priorityOrder]
      );
}
