import fetchMock from 'fetch-mock';

import { urls } from '../client1';

const DEVICES_RESPONSE_BODY_FALLBACK = {
  reason: 'ok',
  message: 'OK',
  data: [
    {
      device_id: '31AAC',
      place_id: 10167,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 2
    },
    {
      device_id: '31A94',
      place_id: 10166,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 2
    },
    {
      device_id: '31A51',
      place_id: 10160,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 2
    },
    {
      device_id: '31A90',
      place_id: 10165,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 2
    },
    {
      device_id: '20002',
      place_id: null,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 1
    },
    {
      device_id: '20001',
      place_id: null,
      protocol: 2,
      device_type: 'parking_sensor',
      activation_status: true,
      firmware_id: 1,
      damaged_status: false,
      owner_id: 1
    }
  ]
};

const PLACES_RESPONSE_BODY_FALLBACK = {
  reason: 'ok',
  message: 'OK',
  data: [
    {
      id: 10167,
      lat: 52.407388191515,
      lon: -1.5073075797018,
      group_id: 965,
      group_inner_id: 1,
      custom_id: null,
      creation_date: '2019-07-25T13:58:54.836Z',
      level: 0,
      network_id: '00000000-0000-0000-0000-000000031aac'
    },
    {
      id: 10891,
      lat: 52.407361229465,
      lon: -1.5073114582107,
      group_id: 965,
      group_inner_id: 2,
      custom_id: 'None',
      creation_date: '2019-07-26T15:31:56.822Z',
      level: 0,
      network_id: '58147a96-22eb-4667-8ac6-8c801ad83d5b'
    },
    {
      id: 10890,
      lat: 52.407334597547,
      lon: -1.5073159681048,
      group_id: 965,
      group_inner_id: 3,
      custom_id: 'None',
      creation_date: '2019-07-26T15:31:56.822Z',
      level: 0,
      network_id: '8f09701c-5112-45df-bea2-1dcb764d1e86'
    },
    {
      id: 10166,
      lat: 52.40730747039,
      lon: -1.5073209289883,
      group_id: 965,
      group_inner_id: 4,
      custom_id: null,
      creation_date: '2019-07-25T13:58:54.778Z',
      level: 0,
      network_id: '00000000-0000-0000-0000-000000031a94'
    },
    {
      id: 10160,
      lat: 52.407280563315,
      lon: -1.5073256192781,
      group_id: 965,
      group_inner_id: 5,
      custom_id: null,
      creation_date: '2019-07-25T13:58:54.413Z',
      level: 0,
      network_id: '00000000-0000-0000-0000-000000031a51'
    },
    {
      id: 10165,
      lat: 52.40725349115,
      lon: -1.507330309568,
      group_id: 965,
      group_inner_id: 6,
      custom_id: null,
      creation_date: '2019-07-25T13:58:54.718Z',
      level: 0,
      network_id: '00000000-0000-0000-0000-000000031a90'
    }
  ]
};

const originalFetch = window.fetch;

window.fetch = fetchMock.sandbox()
  .mock(urls.findDevices, (url, opts) => {
    return originalFetch(url, opts)
      .catch(() => Promise.resolve(DEVICES_RESPONSE_BODY_FALLBACK));
  })
  .mock(urls.findPlaces, (url, opts) => {
    return originalFetch(url, opts)
      .catch(() => Promise.resolve(PLACES_RESPONSE_BODY_FALLBACK));
  });
