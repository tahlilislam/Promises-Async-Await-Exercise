numberFacts1();
async function numberFacts1() {
  let baseUrl = "http://numbersapi.com";
  let favNum = 7;
  try {
    const { data } = await axios.get(`${baseUrl}/${favNum}/trivia?json`);
    console.log(`Number: ${data.number}, Trivia: ${data.text}`);
  } catch (e) {
    console.log(e.message, e);
  }
}

async function numberFacts2() {
  let baseUrl = "http://numbersapi.com";
  let favNumArray = [1, 2, 6, 7, 15];
  try {
    const { data } = await axios.get(`${baseUrl}/${favNumArray}/trivia?json`);
    favNumArray.forEach((num) => {
      console.log(`Number: ${num}, Trivia: ${data[num]}`);
    });
  } catch (e) {
    console.log(e.message, e);
  }
}

async function numberFacts3() {
  let baseUrl = "http://numbersapi.com";
  let favNum = 7;
  let fourNumPromises = [];
  try {
    for (let i = 0; i < 4; i++) {
      fourNumPromises.push(axios.get(`${baseUrl}/${favNum}/trivia?json`));
    }
    const allPromises = await Promise.all(fourNumPromises);
    const body = document.querySelector("body");
    allPromises.forEach(({ data }) => {
      console.log(data.text);
      let para = document.createElement("p");
      para.textContent = data.text;
      body.appendChild(para);
    });
  } catch (e) {
    console.log(e.message, e);
  }
}
// alternate method using Array.from

// async function part3() {
//   let facts = await Promise.all(
//     Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
//   );
//   facts.forEach((data) => {
//     $("body").append(`<p>${data.text}</p>`);
//   });
// }
// part3();
