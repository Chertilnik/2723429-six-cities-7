
export const HouseTypes = ['apartment', 'house', 'room', 'hotel'] as const;
export type HouseType = typeof HouseTypes[number];

export function isHouseType(houseType: string): HouseType {
  const found = HouseTypes.find((el) => el === houseType);
  if (!found) {
    throw new Error('House type is not found');
  }
  return found;
}
