// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 200,
      timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 2000,
      // maxVUs: 100,
    },
  },
};
// test HTTP
export default function () {
  const url = 'http://35.77.230.71:3000/api/2.0/url';
  const res = http.post(
    url,
    JSON.stringify({
      longUrl: 'www.google.com',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
