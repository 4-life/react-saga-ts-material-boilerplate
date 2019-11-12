import faker from 'faker';

import { FetchDevices } from '../actions/device-management/devices';
import { ApiResponse, Device, Place } from '../models';
import { GetPlaces } from '../actions/dummy-data';

const isProd = process.env.REACT_APP_STAGE === 'production';

export const urls = {
  ...(isProd ? {
    findPlaces: 'https://api.prod',
    findDevices: 'https://api.prod'
  } : {
    findPlaces: 'https://yzcgo.sse.codesandbox.io/places',
    findDevices: 'https://yzcgo.sse.codesandbox.io/devices'
  })
};

export type FetchDevicesResponse = ApiResponse<Array<Device>>;

function fillDevice(device: Partial<Device>): Device {
  // FIXME: use smth like `defaults` from "lodash" instead
  // to prevent filling the final object with nil values
  // if the original `device` suddenly contains them
  return {
    device_id: faker.random.alphaNumeric(8),
    place_id: null,
    protocol: faker.system.semver(),
    firmware: faker.system.semver(),
    device_type: 'Parking sensor',
    activation_status: faker.random.boolean(),
    damaged_status: faker.random.boolean(),
    encryption_keys: [faker.random.uuid()],
    owner: faker.company.companyName(),

    last_update_time: faker.date.past().toISOString(),
    last_firmware_update_time: faker.date.past().toISOString(),
    production_batch_id: faker.random.number(),
    assembling_time: faker.date.past().toISOString(),
    purchase_time: faker.date.past().toISOString(),
    warranty_expiration_time: faker.date.past().toISOString(),
    last_disabling_time: faker.date.past().toISOString(),
    last_disabling_reason: faker.lorem.words(20),

    // monitoring information
    last_received_message_time: faker.date.past().toISOString(),
    number_of_open_incidents: faker.random.number({ min: 0, max: 10, precision: 1 }),
    current_connectivity: faker.random.number({ min: 0, max: 100, precision: 1 }),

    ...device
  };
}

type FetchAllDevicesResponse = ApiResponse<Array<Partial<Device>>>;

function fetchAllDevices(): Promise<FetchAllDevicesResponse> {
  return fetch(urls.findDevices)
    .then((res) => res.json());
}

export const fetchDevices = (action: FetchDevices): Promise<FetchDevicesResponse> => {
  return fetchAllDevices()
    .then((res) => {
      return {
        ...res,
        data: res.data && res.data.map(fillDevice),
      };
    })
    .catch((err) => err);
};

export type SearchDevicesResponse = ApiResponse<Array<Device>>;

export function searchDevices(): Promise<SearchDevicesResponse> {
  return fetchAllDevices()
    .then((res) => ({
      ...res,
      data: res.data && res.data.map(fillDevice),
    }))
    .catch((err) => err);
}


type FetchAllPlacesResponse = ApiResponse<Array<Partial<Place>>>;

function fetchAllPlaces(): Promise<FetchAllPlacesResponse> {
  return fetch(urls.findPlaces)
    .then((res) => res.json());
}

export type FetchPlacesResponse = ApiResponse<Array<Place>>;

function fillPlace(place: Partial<Place>): Place {
  // FIXME: use smth like `defaults` from "lodash" instead
  // to prevent filling the final object with nil values
  // if the original `device` suddenly contains them
  return {
    id: faker.random.number(),
    level: faker.random.number({ min: -5, max: 10, precision: 1 }),
    lat: parseFloat(faker.address.latitude()),
    lon: parseFloat(faker.address.longitude()),
    creation_date: faker.date.past().toISOString(),
    group_id: faker.random.number(),
    group_inner_id: faker.random.number(),
    custom_id: faker.random.alphaNumeric(8),
    network_id: faker.random.uuid(),

    ...place,
  };
}

export const fetchPlaces = (action: GetPlaces): Promise<FetchPlacesResponse> => {
  return fetchAllPlaces()
    .then((res) => ({
      ...res,
      data: res.data && res.data.map(fillPlace),
    }))
    .catch((err) => err);
};

export type FetchPlaceDeviceResponse = ApiResponse<Device | null>;

export async function fetchPlaceDevice(
  placeId: Place['id'],
): Promise<FetchPlaceDeviceResponse> {
  return fetchAllDevices()
    .then((res) => {
      let device;

      if (res.data) {
        device = res.data.find((device) => device.place_id === placeId);
      }

      return {
        ...res,
        data: device ? fillDevice(device) : null,
      };
    })
    .catch((err) => err);
}

export type SearchPlacesResponse = ApiResponse<Array<Place>>;

export function searchPlaces(): Promise<SearchPlacesResponse> {
  return fetchAllPlaces()
    .then((res) => ({
      ...res,
      data: res.data && res.data.map(fillPlace),
    }))
    .catch((err) => err);
}
