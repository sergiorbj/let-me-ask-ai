import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { rooms } from './schema/rooms.ts';
import { questions } from './schema/questions.ts';

// Create a schema with only the tables we want to seed
const seedableSchema = {
  rooms,
  questions,
};

await reset(db, seedableSchema);
await seed(db, seedableSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});
await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded');
