/**
 * Get an item
 * @param id: Item Id
 * Returns promose
 */
export function get(id: string): Promise<string> {
  return Promise.resolve(id);
}

export function push(id: string): Promise<boolean> {
  return Promise.reject(id);
}