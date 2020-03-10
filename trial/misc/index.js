
iderainc.slack.com
https://iderainc.slack.com/api/chat.postMessage




const fetch = require('node-fetch');
const auth_token = 'c7d906b6-a474-4c5e-a8fa-66790a486268';

async function getData(url = '') {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      //'X-NuGet-ApiKey': 'd96fb942-f46e-47c9-8677-0f835e23d62',
      'Content-Type': 'application/json',
    }
  });

  let result = await response;
  //console.log(response)
  return result.json()


  // let result = await response.json();
  // return result;
}

// getData('https://sencha.myget.org/F/early-adopter/auth/d96fb942-f46e-47c9-8677-0f835e23d62d/npm')
// .then((response) => {
//   console.log(response)
// })





async function postData(url = '', data = {}) {
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-NuGet-ApiKey': 'd96fb942-f46e-47c9-8677-0f835e23d62',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  //console.log(response.text())
  let result = await response;
  console.log(result)
  return result.json()
  //return result;

  // let result = await response.json();
  // return result;
}

//https://www.venea.net/web/net_ticks_datetime_converter#date_time_to_net_ticks_conversion
let data = {
  first: 'Marcus',
  last: 'Gusmano'

};
//getData('https://mgusmano:Gusheandy1@sencha.myget.org/F/early-adopter/api/v2/feed-state?since=637190265920000000')
//getData('https://mgusmano:Gusheandy1@sencha.myget.org/F/auth/d96fb942-f46e-47c9-8677-0f835e23d62d/npm')
getData('https://sencha.myget.org/F/early-adopter/auth/d96fb942-f46e-47c9-8677-0f835e23d62d/npm')
.then((response) => {
  // response.packages.forEach(package => {
  //   console.log(package.id)
  // })
  console.log(response)
})





async function postData2(url = '', d = {}) {
  console.log(d)
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': d.length
    },
    body: JSON.stringify(d)
  });
  //console.log(response.text())
  //let result = await response.json();
  let result = await response.text();
  return result;
}

// const options = {
//   hostname: 'sencha.myget.org',
//   port: 443,
//   path: '/_api/v1/user',
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${auth_token}`,
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Content-Length': data2.length
//   }
// }
var n = 952


// let data2 = {
//   "name": `marcgusmano${n}`,
//   "email": `mgusmano${n}@yahoo.com`,
//   "username": `marcgusmano${n}`,
//   "password": "sencha",
//   "website": "http://sencha.myget.org",
//   "sendWelcomeEmail": false,
//   "sendPasswordResetEmail": false
// };
// console.log(data2)
// postData2('https://sencha.myget.org:443/_api/v1/user', data2)
// .then((response) => {
//   console.log(response)
//   if(response.errors) {
//     response.errors.forEach(error => console.log(error.messages))
//     //console.log(response.errors[0].messages)
//   }
// })

let data3 = {
  "username": `marcgusmano${n}`,
  "email": `mgusmano${n}@yahoo.com`,
  "privilege": "Consumer"
};
// postData2('https://sencha.myget.org:443/_api/v1/feed/trial/privileges', data3)
// .then((response) => {
//   console.log(response)
//   if(response.errors) {
//     response.errors.forEach(error => console.log(error.messages))
//     //console.log(response.errors[0].messages)
//   }
// })
