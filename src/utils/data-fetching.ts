import React from 'react';

type Options<Value> = {
  fetch: () => Promise<Value>;
  initialValue: Value;
};

type FetcherState<Value> = {
  loading: boolean;
  value: Value;
};

export function useFetcher<Value>(options: Options<Value>): FetcherState<Value> {
  const { fetch } = options;

  const [value, setValue] = React.useState<Value>(options.initialValue);
  const [loading, setLoading] = React.useState(false);
  const [fetcherCalled, setFetcherCalled] = React.useState(false);

  React.useEffect(
    () => {
      if (fetcherCalled || loading) {
        return;
      }

      setFetcherCalled(true);
      setLoading(true);

      fetch()
        .then((res) => setValue(res))
        .finally(() => setLoading(false));
    },
    [
      fetcherCalled, loading, fetch,
      setFetcherCalled, setValue, setLoading,
    ],
  );

  const loadingOrAboutToStartLoading = loading || !fetcherCalled;

  return {
    loading: loadingOrAboutToStartLoading,
    value,
  };
}
