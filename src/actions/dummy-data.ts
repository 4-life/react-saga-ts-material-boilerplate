import { Place } from '../models';

export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED';

type FETCH_PLACES = typeof FETCH_PLACES;
type FETCH_PLACES_SUCCESS = typeof FETCH_PLACES_SUCCESS;
type FETCH_DATA_FAILED = typeof FETCH_DATA_FAILED;

export interface GetPlaces {
  readonly type: FETCH_PLACES;
  ids: number[];
}
interface GetPlacesSuccess {
  readonly type: FETCH_PLACES_SUCCESS;
  payload: Place[];
}
interface GetPlacesFailed {
  readonly type: FETCH_DATA_FAILED;
  payload: string;
}

export const DoGetPlaces: (ids: number[]) => GetPlaces = (ids) => ({
  type: FETCH_PLACES,
  ids,
});

export const GetPlacesFailed: (error: string) => GetPlacesFailed = (error) => ({
  type: FETCH_DATA_FAILED,
  payload: error,
});

export const GetPlacesSuccess: (data: Place[]) => GetPlacesSuccess = (data) => ({
  type: FETCH_PLACES_SUCCESS,
  payload: data,
});

export type Action =
  GetPlaces |
  GetPlacesFailed |
  GetPlacesSuccess;
