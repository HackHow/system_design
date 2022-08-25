// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
// import { fake_longUrl } from './fake_url.js';

let shortFakeArray = [
  {
    short_url: '0089a43',
  },
  {
    short_url: '02b64d6',
  },
  {
    short_url: '032ab3c',
  },
  {
    short_url: '033d2bf',
  },
  {
    short_url: '0729ee6',
  },
  {
    short_url: '0ac896c',
  },
  {
    short_url: '0e3063c',
  },
  {
    short_url: '0e4ec33',
  },
  {
    short_url: '0f820dc',
  },
  {
    short_url: '10459cc',
  },
  {
    short_url: '1072d46',
  },
  {
    short_url: '116d7ec',
  },
  {
    short_url: '11bbb66',
  },
  {
    short_url: '15ef45c',
  },
  {
    short_url: '1743ae9',
  },
  {
    short_url: '174e216',
  },
  {
    short_url: '17a4199',
  },
  {
    short_url: '188b88c',
  },
  {
    short_url: '196509f',
  },
  {
    short_url: '1af6106',
  },
  {
    short_url: '1d20170',
  },
  {
    short_url: '1dddab9',
  },
  {
    short_url: '1f63773',
  },
  {
    short_url: '1fffcec',
  },
  {
    short_url: '2062f16',
  },
  {
    short_url: '230cdff',
  },
  {
    short_url: '2339ce0',
  },
  {
    short_url: '2660046',
  },
  {
    short_url: '27af909',
  },
  {
    short_url: '293eb8c',
  },
  {
    short_url: '2b0dcf3',
  },
  {
    short_url: '2b550d9',
  },
  {
    short_url: '2fb21c9',
  },
  {
    short_url: '32ba3a6',
  },
  {
    short_url: '339d2e9',
  },
  {
    short_url: '33dee03',
  },
  {
    short_url: '37ba79c',
  },
  {
    short_url: '387b6c0',
  },
  {
    short_url: '3b5ec53',
  },
  {
    short_url: '3c2ddb3',
  },
  {
    short_url: '40433d3',
  },
  {
    short_url: '413a393',
  },
  {
    short_url: '4183aa3',
  },
  {
    short_url: '42bda9f',
  },
  {
    short_url: '439cd5c',
  },
  {
    short_url: '4438eac',
  },
  {
    short_url: '44dfc63',
  },
  {
    short_url: '45eb49c',
  },
  {
    short_url: '47b7df9',
  },
  {
    short_url: '4da2473',
  },
  {
    short_url: '4e0867c',
  },
  {
    short_url: '4e36663',
  },
  {
    short_url: '5070f73',
  },
  {
    short_url: '510c616',
  },
  {
    short_url: '5119fdc',
  },
  {
    short_url: '516ad9f',
  },
  {
    short_url: '539be86',
  },
  {
    short_url: '53d9dcf',
  },
  {
    short_url: '542d75f',
  },
  {
    short_url: '559e260',
  },
  {
    short_url: '57221a9',
  },
  {
    short_url: '591dc93',
  },
  {
    short_url: '5af39d6',
  },
  {
    short_url: '5b0736c',
  },
  {
    short_url: '5b2397f',
  },
  {
    short_url: '5ba32f3',
  },
  {
    short_url: '5c141f3',
  },
  {
    short_url: '5f48763',
  },
  {
    short_url: '6038036',
  },
  {
    short_url: '60555f6',
  },
  {
    short_url: '617270c',
  },
  {
    short_url: '619ca1f',
  },
  {
    short_url: '62863b9',
  },
  {
    short_url: '660d86c',
  },
  {
    short_url: '6adf24c',
  },
  {
    short_url: '6bf7829',
  },
  {
    short_url: '6d82d76',
  },
  {
    short_url: '6f6bd00',
  },
  {
    short_url: '70854e6',
  },
  {
    short_url: '71e8ecf',
  },
  {
    short_url: '721e26f',
  },
  {
    short_url: '738da00',
  },
  {
    short_url: '73c8e93',
  },
  {
    short_url: '75b17ef',
  },
  {
    short_url: '76e01d6',
  },
  {
    short_url: '7727086',
  },
  {
    short_url: '7883b10',
  },
  {
    short_url: '7ae67e9',
  },
  {
    short_url: '7bad6e3',
  },
  {
    short_url: '7bbb580',
  },
  {
    short_url: '7c79353',
  },
  {
    short_url: '7d0ab10',
  },
  {
    short_url: '7eeb196',
  },
  {
    short_url: '7f0f253',
  },
  {
    short_url: '80a8be0',
  },
  {
    short_url: '80cfb9f',
  },
  {
    short_url: '81e2253',
  },
  {
    short_url: '838db49',
  },
  {
    short_url: '83b3b93',
  },
  {
    short_url: '843f0e3',
  },
  {
    short_url: '85ff8e3',
  },
  {
    short_url: '8c8e9c6',
  },
  {
    short_url: '8e51d3c',
  },
  {
    short_url: '8ef7f89',
  },
  {
    short_url: '90a8486',
  },
  {
    short_url: '9187193',
  },
  {
    short_url: '96e972f',
  },
  {
    short_url: '97039a0',
  },
  {
    short_url: '974c2ec',
  },
  {
    short_url: '986eeb6',
  },
  {
    short_url: '99c0df0',
  },
  {
    short_url: '9a78309',
  },
  {
    short_url: '9b9545f',
  },
  {
    short_url: '9dac669',
  },
  {
    short_url: '9eef24f',
  },
  {
    short_url: 'a076356',
  },
  {
    short_url: 'a14b873',
  },
  {
    short_url: 'a1db943',
  },
  {
    short_url: 'a31717f',
  },
  {
    short_url: 'a64a4b0',
  },
  {
    short_url: 'a812fbf',
  },
  {
    short_url: 'a95db86',
  },
  {
    short_url: 'ad1c84f',
  },
  {
    short_url: 'b55dbf3',
  },
  {
    short_url: 'b6b33a9',
  },
  {
    short_url: 'b7c9f9c',
  },
  {
    short_url: 'b8c95b6',
  },
  {
    short_url: 'bcd5593',
  },
  {
    short_url: 'bd1f2fc',
  },
  {
    short_url: 'bead3c3',
  },
  {
    short_url: 'c1ffd00',
  },
  {
    short_url: 'c6da996',
  },
  {
    short_url: 'c7ec76f',
  },
  {
    short_url: 'c8e9709',
  },
  {
    short_url: 'c97641c',
  },
  {
    short_url: 'c9fac93',
  },
  {
    short_url: 'cae57ec',
  },
  {
    short_url: 'cbc01ff',
  },
  {
    short_url: 'cc4bf70',
  },
  {
    short_url: 'ccdad46',
  },
  {
    short_url: 'ccf4c46',
  },
  {
    short_url: 'cd1f06c',
  },
  {
    short_url: 'ce990a6',
  },
  {
    short_url: 'ceabe3c',
  },
  {
    short_url: 'cf2eadc',
  },
  {
    short_url: 'd1138cf',
  },
  {
    short_url: 'd1e0b86',
  },
  {
    short_url: 'd67f646',
  },
  {
    short_url: 'd811723',
  },
  {
    short_url: 'd8d02c9',
  },
  {
    short_url: 'd92584c',
  },
  {
    short_url: 'd9548b9',
  },
  {
    short_url: 'd9b4d8c',
  },
  {
    short_url: 'da18cdc',
  },
  {
    short_url: 'da566a9',
  },
  {
    short_url: 'dbac6ff',
  },
  {
    short_url: 'dc0e51c',
  },
  {
    short_url: 'dcb8846',
  },
  {
    short_url: 'dcdc899',
  },
  {
    short_url: 'de880af',
  },
  {
    short_url: 'df76409',
  },
  {
    short_url: 'e0976f9',
  },
  {
    short_url: 'e0aee9c',
  },
  {
    short_url: 'e12547c',
  },
  {
    short_url: 'e192340',
  },
  {
    short_url: 'e1dc47c',
  },
  {
    short_url: 'e22dfac',
  },
  {
    short_url: 'e2855d9',
  },
  {
    short_url: 'e429d4f',
  },
  {
    short_url: 'e58c493',
  },
  {
    short_url: 'e79d26c',
  },
  {
    short_url: 'eb04faf',
  },
  {
    short_url: 'eb3dc76',
  },
  {
    short_url: 'f002983',
  },
  {
    short_url: 'f13fba3',
  },
  {
    short_url: 'f2d4813',
  },
  {
    short_url: 'f2f51cc',
  },
  {
    short_url: 'f337069',
  },
  {
    short_url: 'f4215cc',
  },
  {
    short_url: 'f6d7510',
  },
  {
    short_url: 'f810a39',
  },
  {
    short_url: 'fa9558c',
  },
  {
    short_url: 'fb40a4f',
  },
  {
    short_url: 'fc87ba9',
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
      duration: '20s',
      preAllocatedVUs: 10000,
      maxVUs: 10000,
    },
  },
};

// test HTTP
export default function () {
  let test_url = `http://sdAlb-1701157693.ap-northeast-1.elb.amazonaws.com/api/3.0/url?shortUrl=${shortFakeArray[num].short_url}`;
  const res = http.get(test_url);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
