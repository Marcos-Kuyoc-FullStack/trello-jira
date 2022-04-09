export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus; // pending, in-progress, finish
}

export type EntryStatus = 'pending' | 'in-progress' | 'finish'