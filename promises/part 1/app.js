// function numberFacts() {
//   let baseUrl = "http://numbersapi.com";
//   let favNum = 7;

//   axios
//     .get(`${baseUrl}/${favNum}/trivia?json`)
//     .then((res) => {
//       console.log(`Number: ${res.data.number}, Trivia: ${res.data.text}`, res);
//     })
//     .catch((err) => {
//       console.log(`${err}`);
//     });
// }

// 1
let baseUrl = "http://numbersapi.com";
let favNum = 7;

axios
  .get(`${baseUrl}/${favNum}/trivia?json`)
  .then((res) => {
    console.log(`Number: ${res.data.number}, Trivia: ${res.data.text}`, res);
  })
  .catch((err) => {
    console.log(`${err}`);
  });

// 2
let favNumArray = [1, 2, 6, 7, 15];
axios
  .get(`${baseUrl}/${favNumArray}/trivia?json`)
  .then((res) => {
    console.log(res);
    favNumArray.forEach((num) => {
      console.log(`Number: ${num}, Trivia: ${res.data[num]}`);
    });
  })
  .catch((err) => {
    console.log(`${err}`);
  });

// 3
let fourNumPromises = [];

for (let i = 0; i < 4; i++) {
  fourNumPromises.push(axios.get(`${baseUrl}/${favNum}/trivia?json`));
}

Promise.all(fourNumPromises)
  .then((responses) => {
    const body = document.querySelector("body");
    responses.forEach((res) => {
      console.log(res.data.text);
      let para = document.createElement("p");
      para.textContent = res.data.text;
      body.appendChild(para);
    });
  })
  .catch((err) => console.log(err));

// 3. alternate
// Promise.all(
//     Array.from({ length: 4 }, () => {
//       return $.getJSON(`${baseURL}/${favNumber}?json`);
//     })
//   ).then(facts => {
//     facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
//   });
