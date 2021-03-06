import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './const';

const GET_ALL_EVENTS = BASE_URL + '/events/user';
const POST_MATCH = BASE_URL + '/match';
const GET_MATCHED_EVENTS = BASE_URL + '/matched-events/user';

export const NONE = 'none';
export const FETCH_ERROR = 'fetch_error';
export const POST_ERROR = 'post_error';

export type EventError = typeof NONE | typeof FETCH_ERROR | typeof POST_ERROR;

export interface IEvent {
  [x: string]: any;
  id: string;
  name: string;
  image_url: string;
  description: string;
  time_start?: string;
  time_end?: string;
  event_site_url?: string;
  category?: string;
}

interface IEventResponse {
  id: number;
  events: IEvent[];
}

export const getAllEvents = (
  userId: string | undefined,
  lat: string,
  lon: string,
  radius: string
): Promise<AxiosResponse<IEventResponse>> => {
  console.log(GET_ALL_EVENTS + '/' + userId + '/location/' + lat + '-' + lon + '-' + radius)
  return axios.get(
    GET_ALL_EVENTS + '/' + userId + '/location/' + lat + '-' + lon + '-' + radius
  );
};

export const getMatchedEvents = (
  userId: string | undefined
): Promise<AxiosResponse<IEventResponse>> => {
  return axios.get(GET_MATCHED_EVENTS + '/' + userId);
};

export const postMatch = (
  userId: string | undefined,
  eventId: string,
  isMatch: boolean,
  category: string | undefined
): Promise<AxiosResponse> => {
  return axios.post(POST_MATCH, {
    userId: userId,
    eventId: eventId,
    isMatch: isMatch,
    eventCategory: category,
  });
};
