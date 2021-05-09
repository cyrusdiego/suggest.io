import axios, {AxiosResponse} from 'axios';
import {getMatchedEventIds} from './db_handler';

interface IEvent {
    id: string,
    name: string,
    image_url: string,
    description: string
}

export interface IEventResponse {
    id: number;
    events: IEvent[];
}

const YELP_API_KEY = "1ivgB27DrOOF9NbyWW95E1w3eWxw1MD21uhjZaxI1jPXWaEn-m06uNVdvXVecLc9nt663pSNIdiHIyGYi-UMqBiIw0o_BPhTy50GUYhBMmWyfRNXnOYZurdy7LOWYHYx"

/**
 * Call inside .then handler, e.g.
 *   getEvents("53.53216861500475", "-113.57363822706881", "40000")
 *   .then((value) => {
 *      // handle return value here
 *   }, (reject) => {
 *      // handle rejection here
 *   })
 *   .catch((e) => {// handle error here})
 */
export function getEvents(latitude: string, longitude: string, radius: string) {

    const res = axios.get(`https://api.yelp.com/v3/events?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=50`, {
        headers: {
          "Authorization": `Bearer ${YELP_API_KEY}`
        }
      })
      .then((response) => {
        const results: IEventResponse = {
          id: new Date().getTime(),
          events: response.data.events.map(({id, name, image_url, description}: IEvent)=>({id, name, image_url, description}))
        };
        return results;
      }, (rej) => {
        console.log(rej)})
  
      .catch((e) => console.log(e)).finally(() => {return null});
      return res;
  }

/**
 * Call inside .then handler, e.g.
 *   getMatchedEvents("8lzcBdjb0x4t1yev6DBl")
 *   .then((value) => {
 *      // handle return value here
 *   }, (reject) => {
 *      // handle rejection here
 *   })
 *   .catch((e) => {// handle error here})
 */
export function getMatchedEvents(userId: string) {

  // Function that gets array of event IDs for a given user ID
  const eventsArr = getMatchedEventIds(userId).then((val: string[]) => {

    if (val == null) {
      return null;
    } else {

    // Map IDs to API endpoints then make request
    let eventIds = val.map(id => `https://api.yelp.com/v3/events/${id}`);
    const res = axios.all(eventIds.map(url => axios.get(url, {headers: {"Authorization": `Bearer ${YELP_API_KEY}`}})))
    
    // Format and return promise with results
    .then(responseArr => {
      const results = responseArr.map(({data})=>({data}));
      return results;
    }, (rej) => {
      console.log(rej)})

    .catch((e) => console.log(e)).finally(() => {return null});
    return res;
    }

  }, (rej) => {
    console.log(rej)})

  .catch((e) => console.log(e)).finally(() => {return null});
  
  return eventsArr; 
}

import {getUTCSeconds, getUTCMinutes, getUTCHour, getUTCDate, getUTCMonth, getUTCFullYear} from 'date';


function extractFutureEvents(events: Array<IEvent>) {
    let futureEvents: Array<IEvent>;
    let now: Date = new Date();
    let year = Date().getUTCSeconds();
    let day = getDate()
    events.forEach((val, i, arr) => {
        if (val.time_end != null) {
            
        } else {
            let e_year
        }
    });
}
