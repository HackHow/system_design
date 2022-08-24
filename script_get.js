// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
// import { fake_longUrl } from './fake_url.js';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 650,
      timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 13000,
      maxVUs: 13000,
    },
  },
};

// test HTTP
export default function () {
  let test_url = `http://35.77.230.71:3000/api/1.0/url?shortUrl=ef8babc`;
  const res = http.get(test_url);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
