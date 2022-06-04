interface seedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: seedData = {
  entries: [
    {
      description: '[pending] lorem',
      status: 'pending',
      createdAt: Date.now()
    },
    {
     description: '[in-progress] lorem lorem',
     status: 'in-progress',
     createdAt: Date.now() - 1000000
   },
   {
     description: '[finish] lorem lorem lorem',
     status: 'finish',
     createdAt: Date.now() - 100000
   }
  ]
}