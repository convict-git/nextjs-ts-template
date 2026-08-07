import { itemStore } from '@/graphql/data/items';

describe('itemStore', () => {
  it('creates and reads an item', () => {
    const created = itemStore.create({
      title: 'Test item',
      description: 'Example',
    });

    expect(created.title).toBe('Test item');
    expect(itemStore.findById(created.id)).toEqual(created);
  });

  it('updates an existing item', () => {
    const created = itemStore.create({ title: 'Original' });
    const updated = itemStore.update(created.id, { title: 'Updated' });

    expect(updated?.title).toBe('Updated');
  });

  it('deletes an item', () => {
    const created = itemStore.create({ title: 'Temporary' });
    expect(itemStore.delete(created.id)).toBe(true);
    expect(itemStore.findById(created.id)).toBeUndefined();
  });
});
