import type { CreateItemInput, Item, UpdateItemInput } from '@/graphql/types/item';

const items: Item[] = [
  {
    id: '1',
    title: 'First item',
    description: 'A seeded example item for sandboxing.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 2;

export const itemStore = {
  findAll(): Item[] {
    return [...items];
  },

  findById(id: string): Item | undefined {
    return items.find(item => item.id === id);
  },

  create(input: CreateItemInput): Item {
    const now = new Date().toISOString();
    const item: Item = {
      id: String(nextId++),
      title: input.title,
      description: input.description ?? null,
      createdAt: now,
      updatedAt: now,
    };
    items.push(item);
    return item;
  },

  update(id: string, input: UpdateItemInput): Item | null {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Item = {
      ...items[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    items[index] = updated;
    return updated;
  },

  delete(id: string): boolean {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    return true;
  },
};
