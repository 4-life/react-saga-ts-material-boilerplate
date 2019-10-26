export function combineIds(...ids) {
  const combinedId = ids
    .filter(id => id || typeof id === 'number')
    .join('-');

  return combinedId || undefined;
}
