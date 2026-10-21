
export const Conveniences = ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'] as const;
export type Convenience = typeof Conveniences[number];

export function isConvenience(convenience: string): Convenience {
  const found = Conveniences.find((el) => el === convenience);
  if (!found) {
    throw new Error('No convenience found.');
  }
  return found;
}
