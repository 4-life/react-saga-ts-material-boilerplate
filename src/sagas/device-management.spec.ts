import { fetchDataApi } from './device-management';

describe('Test1', () => {
  const generator = fetchDataApi({ ids: [1, 2], type: 'FETCH_PLACES' });

  it('Start Saga test', () => {
    expect(generator.next().value);
  });
});
