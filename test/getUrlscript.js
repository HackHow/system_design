// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
// import { fake_longUrl } from './fake_url.js';

let shortFakeArray = [
  {
    short_url: '017Et8l',
  },
  {
    short_url: '01yG2U9',
  },
  {
    short_url: '03IIcUf',
  },
  {
    short_url: '03ILSux',
  },
  {
    short_url: '03sCft9',
  },
  {
    short_url: '04fG6UW',
  },
  {
    short_url: '05QeGlQ',
  },
  {
    short_url: '06Y3rUH',
  },
  {
    short_url: '0701vmB',
  },
  {
    short_url: '07qLQYo',
  },
  {
    short_url: '07T2y6K',
  },
  {
    short_url: '0862zl3',
  },
  {
    short_url: '0A3XHju',
  },
  {
    short_url: '0AOYzn9',
  },
  {
    short_url: '0aYA2b3',
  },
  {
    short_url: '0b4IKq0',
  },
  {
    short_url: '0bEHpyo',
  },
  {
    short_url: '0byg5eB',
  },
  {
    short_url: '0c1pn9l',
  },
  {
    short_url: '0c4Plpr',
  },
  {
    short_url: '0C6szof',
  },
  {
    short_url: '0cfHjEN',
  },
  {
    short_url: '0Ci2x9E',
  },
  {
    short_url: '0CMerZl',
  },
  {
    short_url: '0Cr4xLW',
  },
  {
    short_url: '0cSIpn0',
  },
  {
    short_url: '0DltDk3',
  },
  {
    short_url: '0eaJreH',
  },
  {
    short_url: '0EcQ2jB',
  },
  {
    short_url: '0edYg39',
  },
  {
    short_url: '0eesNyB',
  },
  {
    short_url: '0eHEvf0',
  },
  {
    short_url: '0eIaF6c',
  },
  {
    short_url: '0EnqL2K',
  },
  {
    short_url: '0Ew77g3',
  },
  {
    short_url: '0FB7OpE',
  },
  {
    short_url: '0FDcBsr',
  },
  {
    short_url: '0fQIFSu',
  },
  {
    short_url: '0g7LPju',
  },
  {
    short_url: '0gA1l4i',
  },
  {
    short_url: '0gMt9m3',
  },
  {
    short_url: '0gOTisf',
  },
  {
    short_url: '0Gr8QGN',
  },
  {
    short_url: '0GSk1PZ',
  },
  {
    short_url: '0GyBvhx',
  },
  {
    short_url: '0gZHIqf',
  },
  {
    short_url: '0HBHaYK',
  },
  {
    short_url: '0hnm2Bo',
  },
  {
    short_url: '0i38c06',
  },
  {
    short_url: '0i522uo',
  },
  {
    short_url: '0iC55SB',
  },
  {
    short_url: '0JqCH89',
  },
  {
    short_url: '0KCfWzx',
  },
  {
    short_url: '0kDi0FQ',
  },
  {
    short_url: '0kHEsu6',
  },
  {
    short_url: '0kIJSJu',
  },
  {
    short_url: '0KKsyyW',
  },
  {
    short_url: '0kVn7yZ',
  },
  {
    short_url: '0kzQxJ3',
  },
  {
    short_url: '0NANozQ',
  },
  {
    short_url: '0nJ4IXN',
  },
  {
    short_url: '0nPZHB9',
  },
  {
    short_url: '0Nt8HAf',
  },
  {
    short_url: '0NWwtGB',
  },
  {
    short_url: '0o1DGPN',
  },
  {
    short_url: '0O3xrZi',
  },
  {
    short_url: '0oN6W9B',
  },
  {
    short_url: '0OZpinT',
  },
  {
    short_url: '0pwf7T6',
  },
  {
    short_url: '0PXQA4r',
  },
  {
    short_url: '0q5oilN',
  },
  {
    short_url: '0QkhNLH',
  },
  {
    short_url: '0qQWCoo',
  },
  {
    short_url: '0qtANAZ',
  },
  {
    short_url: '0QUd3gZ',
  },
  {
    short_url: '0r2U9tW',
  },
  {
    short_url: '0RB1YOf',
  },
  {
    short_url: '0slt8Zo',
  },
  {
    short_url: '0sxJZkc',
  },
  {
    short_url: '0T2X0yx',
  },
  {
    short_url: '0tJPzmZ',
  },
  {
    short_url: '0U6ciKr',
  },
  {
    short_url: '0UIt15H',
  },
  {
    short_url: '0v7E523',
  },
  {
    short_url: '0VDPIHN',
  },
  {
    short_url: '0VJto5l',
  },
  {
    short_url: '0vKItei',
  },
  {
    short_url: '0WpE1jE',
  },
  {
    short_url: '0wYwkfE',
  },
  {
    short_url: '0x0CtjZ',
  },
  {
    short_url: '0xoyG9o',
  },
  {
    short_url: '0XyxwW9',
  },
  {
    short_url: '0XzARXf',
  },
  {
    short_url: '0yGEG60',
  },
  {
    short_url: '0yj50EE',
  },
  {
    short_url: '0YLxLe9',
  },
  {
    short_url: '0ymneMf',
  },
  {
    short_url: '0yUbnnr',
  },
  {
    short_url: '0ZFGjR6',
  },
  {
    short_url: '0ZwyiQE',
  },
];

let num = Math.floor(Math.random() * shortFakeArray.length);
// console.log(`shortUrl=${shortFakeArray[num].short_url}`);

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 2500,
    },
  },
};

// test HTTP
// export default function () {
//   let test_url = `http://35.77.230.71:3000/api/1.0/url?shortUrl=${shortFakeArray[num].short_url}`;
//   const res = http.get(test_url);
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }

export default function () {
  const url = `http://35.77.230.71:3000/api/2.0/url?shortUrl=${shortFakeArray[num].short_url}`;
  const res = http.get(url);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
