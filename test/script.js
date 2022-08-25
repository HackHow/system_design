// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 300,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 3000,
      // maxVUs: 100,
    },
  },
};
// test HTTP
export default function () {
  const url =
    'http://sdAlb-1701157693.ap-northeast-1.elb.amazonaws.com/api/2.0/url';
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
