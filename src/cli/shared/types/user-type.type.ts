export const UserTypes = ['common', 'pro'] as const;

export type UserType = typeof UserTypes[number];

export function isUserType(value: string): UserType {
  const found = UserTypes.find((el) => el === value);
  if (!found) {
    throw new Error(`Unknown user type: ${value}`);
  }
  return found;
}
