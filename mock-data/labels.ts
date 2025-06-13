export interface LabelInterface {
   id: string;
   name: string;
   color: string;
}

export const labels: LabelInterface[] = [
   { id: 'ui', name: 'UI Enhancement', color: 'purple' },
   { id: 'bug', name: 'Bug', color: 'red' },
   { id: 'feature', name: 'Feature', color: 'green' },
];
