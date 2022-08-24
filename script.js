// k6 run script.js

import http from 'k6/http';
import { check, sleep } from 'k6';
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

// test HTTP
export default function () {
  const url_array = [
    {
      long_url: 'https://lulu.com/non/mi/integer.xml',
    },
    {
      long_url: 'https://linkedin.com/diam/nam.xml',
    },
    {
      long_url: 'https://google.com/cras/in.xml',
    },
    {
      long_url: 'http://a8.net/lobortis/est/phasellus/sit/amet/erat.png',
    },
    {
      long_url: 'https://jugem.jp/nulla/mollis/molestie/lorem/quisque.jsp',
    },
    {
      long_url: 'https://artisteer.com/lobortis/vel/dapibus/at/diam.aspx',
    },
    {
      long_url: 'http://furl.net/quam/nec/dui.jpg',
    },
    {
      long_url:
        'https://weebly.com/nulla/suscipit/ligula/in/lacus/curabitur/at.jpg',
    },
    {
      long_url: 'http://youku.com/ut/mauris/eget/massa/tempor.png',
    },
    {
      long_url:
        'http://g.co/vestibulum/aliquet/ultrices/erat/tortor/sollicitudin.html',
    },
    {
      long_url: 'https://gravatar.com/massa.aspx',
    },
    {
      long_url:
        'http://newsvine.com/luctus/ultricies/eu/nibh/quisque/id/justo.html',
    },
    {
      long_url: 'https://pinterest.com/velit.jsp',
    },
    {
      long_url:
        'https://storify.com/molestie/nibh/in/lectus/pellentesque/at/nulla.xml',
    },
    {
      long_url: 'https://squidoo.com/ligula/in/lacus.xml',
    },
    {
      long_url: 'https://dedecms.com/praesent/blandit.png',
    },
    {
      long_url:
        'https://linkedin.com/et/magnis/dis/parturient/montes/nascetur.html',
    },
    {
      long_url: 'http://nyu.edu/morbi/porttitor/lorem/id/ligula.aspx',
    },
    {
      long_url: 'http://etsy.com/proin/risus/praesent/lectus/vestibulum.jsp',
    },
    {
      long_url: 'https://goo.gl/sed.html',
    },
    {
      long_url: 'https://wufoo.com/erat/tortor/sollicitudin/mi/sit.html',
    },
    {
      long_url:
        'http://list-manage.com/ligula/suspendisse/ornare/consequat/lectus/in/est.json',
    },
    {
      long_url: 'https://sun.com/velit/vivamus/vel/nulla/eget/eros.png',
    },
    {
      long_url: 'http://cdc.gov/sagittis/sapien/cum.json',
    },
    {
      long_url:
        'http://sina.com.cn/massa/tempor/convallis/nulla/neque/libero/convallis.png',
    },
    {
      long_url: 'https://tiny.cc/sed/augue/aliquam.jpg',
    },
    {
      long_url: 'http://tmall.com/tempus/vel.aspx',
    },
    {
      long_url: 'https://ucla.edu/libero.jpg',
    },
    {
      long_url: 'http://apple.com/in/eleifend/quam/a/odio.js',
    },
    {
      long_url: 'https://thetimes.co.uk/cursus.jpg',
    },
    {
      long_url: 'https://washington.edu/orci/luctus/et.js',
    },
    {
      long_url:
        'https://godaddy.com/vestibulum/vestibulum/ante/ipsum/primis/in/faucibus.json',
    },
    {
      long_url: 'http://techcrunch.com/nulla/suspendisse/potenti/cras/in.aspx',
    },
    {
      long_url: 'http://cnbc.com/ac/enim/in.js',
    },
    {
      long_url: 'https://fc2.com/tempus/vivamus/in/felis/eu.xml',
    },
    {
      long_url: 'http://sogou.com/lectus/aliquam/sit/amet/diam/in/magna.json',
    },
    {
      long_url: 'http://state.tx.us/pellentesque/viverra/pede/ac/diam.jsp',
    },
    {
      long_url: 'https://whitehouse.gov/eget.json',
    },
    {
      long_url:
        'https://dailymotion.com/nulla/nisl/nunc/nisl/duis/bibendum/felis.aspx',
    },
    {
      long_url:
        'http://slideshare.net/pellentesque/eget/nunc/donec/quis/orci.json',
    },
    {
      long_url: 'https://ox.ac.uk/tempus/vel/pede/morbi/porttitor.xml',
    },
    {
      long_url: 'https://webmd.com/ligula/vehicula/consequat/morbi.js',
    },
    {
      long_url: 'https://dailymail.co.uk/nisi.jsp',
    },
    {
      long_url: 'https://wix.com/quis/odio.js',
    },
    {
      long_url:
        'https://addthis.com/pellentesque/at/nulla/suspendisse/potenti.html',
    },
    {
      long_url: 'https://china.com.cn/massa.html',
    },
    {
      long_url:
        'http://oakley.com/donec/pharetra/magna/vestibulum/aliquet.json',
    },
    {
      long_url: 'https://senate.gov/libero.jpg',
    },
    {
      long_url: 'http://tripod.com/eros/suspendisse/accumsan.xml',
    },
    {
      long_url: 'https://mlb.com/ultrices/enim.jsp',
    },
    {
      long_url: 'http://bbb.org/cum/sociis/natoque.jsp',
    },
    {
      long_url: 'https://addthis.com/nulla/ut/erat/id/mauris.png',
    },
    {
      long_url:
        'https://who.int/nec/euismod/scelerisque/quam/turpis/adipiscing.json',
    },
    {
      long_url: 'https://naver.com/nunc/commodo.aspx',
    },
    {
      long_url: 'https://oakley.com/at/nulla/suspendisse/potenti/cras.xml',
    },
    {
      long_url: 'https://businesswire.com/potenti.jpg',
    },
    {
      long_url: 'https://gizmodo.com/lectus/aliquam/sit/amet.png',
    },
    {
      long_url: 'http://tiny.cc/massa/id/lobortis/convallis.xml',
    },
    {
      long_url: 'https://mediafire.com/pede/libero/quis/orci/nullam.png',
    },
    {
      long_url: 'https://patch.com/nibh/in/hac/habitasse.jsp',
    },
    {
      long_url:
        'https://businesswire.com/platea/dictumst/aliquam/augue/quam.html',
    },
    {
      long_url:
        'https://pinterest.com/fusce/congue/diam/id/ornare/imperdiet/sapien.aspx',
    },
    {
      long_url: 'https://behance.net/in.js',
    },
    {
      long_url:
        'http://accuweather.com/sodales/sed/tincidunt/eu/felis/fusce.jsp',
    },
    {
      long_url: 'https://google.es/sollicitudin/ut/suscipit/a/feugiat/et.png',
    },
    {
      long_url: 'https://techcrunch.com/arcu/sed/augue/aliquam/erat.jsp',
    },
    {
      long_url: 'https://nyu.edu/morbi/non/quam/nec/dui/luctus/rutrum.jpg',
    },
    {
      long_url:
        'http://comcast.net/luctus/et/ultrices/posuere/cubilia/curae/mauris.js',
    },
    {
      long_url: 'http://nih.gov/ante.jpg',
    },
    {
      long_url:
        'https://mayoclinic.com/risus/semper/porta/volutpat/quam/pede.jpg',
    },
    {
      long_url:
        'https://people.com.cn/erat/id/mauris/vulputate/elementum/nullam.jsp',
    },
    {
      long_url: 'http://altervista.org/tincidunt/in.png',
    },
    {
      long_url: 'http://slashdot.org/at.jsp',
    },
    {
      long_url:
        'http://domainmarket.com/justo/pellentesque/viverra/pede/ac/diam.jpg',
    },
    {
      long_url: 'https://t-online.de/non/mi/integer/ac/neque.png',
    },
    {
      long_url: 'https://msu.edu/ac/nulla/sed/vel/enim.jsp',
    },
    {
      long_url:
        'https://slate.com/integer/aliquet/massa/id/lobortis/convallis/tortor.html',
    },
    {
      long_url:
        'http://reference.com/et/magnis/dis/parturient/montes/nascetur/ridiculus.xml',
    },
    {
      long_url: 'https://google.co.jp/quis/odio/consequat/varius/integer.js',
    },
    {
      long_url: 'https://cyberchimps.com/id/ligula.jsp',
    },
    {
      long_url: 'https://quantcast.com/nulla/neque/libero/convallis/eget.jpg',
    },
    {
      long_url: 'http://google.com.br/tristique/in/tempus.xml',
    },
    {
      long_url: 'https://baidu.com/augue/aliquam/erat/volutpat/in.aspx',
    },
    {
      long_url: 'https://nymag.com/nascetur.js',
    },
    {
      long_url: 'https://apache.org/nisi/nam.jpg',
    },
    {
      long_url: 'http://auda.org.au/praesent/blandit.js',
    },
    {
      long_url:
        'https://liveinternet.ru/vestibulum/ante/ipsum/primis/in/faucibus.jsp',
    },
    {
      long_url:
        'https://wikispaces.com/congue/diam/id/ornare/imperdiet/sapien/urna.json',
    },
    {
      long_url: 'http://creativecommons.org/lorem/ipsum/dolor.aspx',
    },
    {
      long_url: 'http://exblog.jp/semper/porta/volutpat/quam/pede/lobortis.jsp',
    },
    {
      long_url: 'http://amazon.de/eget/nunc/donec/quis.json',
    },
    {
      long_url: 'https://yale.edu/orci/luctus.html',
    },
    {
      long_url: 'https://surveymonkey.com/quis/augue.json',
    },
    {
      long_url: 'https://huffingtonpost.com/rutrum/at/lorem.jpg',
    },
    {
      long_url: 'http://smh.com.au/condimentum/neque/sapien/placerat/ante.aspx',
    },
    {
      long_url: 'http://mayoclinic.com/sapien/arcu.jsp',
    },
    {
      long_url:
        'http://behance.net/eu/magna/vulputate/luctus/cum/sociis/natoque.png',
    },
    {
      long_url:
        'http://creativecommons.org/nullam/porttitor/lacus/at/turpis/donec.json',
    },
    {
      long_url:
        'http://deliciousdays.com/leo/rhoncus/sed/vestibulum/sit/amet.aspx',
    },
    {
      long_url: 'http://discuz.net/quis.js',
    },
  ];

  let num = Math.floor(Math.random() * url.length);
  let test_url = `http://localhost:3000/api/1.0/url`;
  const res = http.post(test_url, JSON.stringify(url_array[num].long_url), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
