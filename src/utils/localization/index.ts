import en from './locales/en.json';

/**
 * Get localization resources.
 * 
 * Exposed as a hook to prevent access outside of React tree,
 * since localization can be loaded and updated dynamically in the future.
 */
export function useLocalization(): Readonly<typeof en> {
  return en;
}

export function resolveArgs(text: string, args: object) {
  return text.replace(
    new RegExp(
      '\\{\\{' +
        '(' +
          Object.keys(args).join('|') +
        ')' +
      '\\}\\}',
      'g'
    ),
    (_, argName) => args[argName],
  );
}
