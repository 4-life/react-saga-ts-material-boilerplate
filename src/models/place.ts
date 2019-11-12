import { DeviceId, PlaceId } from './shared';

export interface Place { 
  /**
   * Place Primary Key
   */
  id: PlaceId;
  level?: number;
  lat: number;
  lon: number;
  creation_date?: string;
  /**
   * Group Primary Key
   */
  group_id: number;
  group_inner_id: number;
  custom_id?: string;
  network_id?: string;
  device_id?: DeviceId | null;
}

export function isPlaceId(x: any): x is Place['id'] {
  return typeof x === 'number';
}

export function formatPlaceName(place: Place) {
  if (!place.custom_id) {
    return `#${place.id}`;
  }

  return `#${place.id} / ${place.custom_id}`;
}
