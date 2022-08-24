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
// const url_array = fake_longUrl;
// let num = Math.floor(Math.random() * url_array.length);

function makeid(length) {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// test HTTP
export default function () {
  let test_url = `http://35.77.230.71:3000/api/1.0/url`;
  const res = http.post(
    test_url,
    JSON.stringify({
      url: 'http://' + makeid(30) + '/',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
