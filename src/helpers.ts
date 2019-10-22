import { Place } from './models';

/**
 * Helper functions
 */

/**
 * Make string like 'name-id1, name-id2' from array of objects
 * @param selected selected ids
 * @param arr array of objects
 */
export function fromArrayToString<T extends Place>(selected: number[], arr: T[]): string {
  const data: string[] = [];
  for (const id of selected) {
    const finded = arr.find(el => el.id === id);

    if (finded) {
      data.push(`${finded.custom_id} ${finded.id}`);
    }
  }

  return data.join(', ');
}
