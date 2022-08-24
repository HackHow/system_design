// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { fake_longUrl } from './fake_url.js';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 40,
      timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};
const url_array = fake_longUrl;

let num = Math.floor(Math.random() * url_array.length);

console.log(
  '{ url: url_array[num].long_url }: ',
  JSON.stringify({
    url: url_array[num].long_url,
  })
);

// test HTTP
export default function () {
  let test_url = `http://localhost:3000/api/1.0/url`;
  const res = http.post(
    test_url,
    JSON.stringify({
      url: url_array[num].long_url,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
