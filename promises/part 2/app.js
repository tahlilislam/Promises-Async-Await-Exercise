drawCards();
oneCard();
twoCardsFromDeck();

function oneCard() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";

  axios
    .get(`${baseUrl}/new/draw/`)
    .then((res) => {
    //   console.log(res.data.cards[0]);
      let { suit, value } = res.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })
    .catch((err) => console.log(err));
}

function twoCardsFromDeck() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";

  let firstCard = null;
  axios
    .get(`${baseUrl}/new/draw/`)
    .then((res) => {
      firstCard = res.data.cards[0];
      let deckId = res.data.deck_id;
    //   console.log(res.data);
      return axios.get(`${baseUrl}/${deckId}/draw/`);
    })
    .then((res) => {
      let secondCard = res.data.cards[0];
    //   console.log(firstCard, secondCard);
      [firstCard, secondCard].forEach((card) => {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    })
    .catch((err) => console.log(err));
}
function drawCards() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";

  let deckId = null;
  let $btn = $("button");
  let $cardArea = $("#card-area");

  axios.get(`${baseUrl}/new/shuffle/?deck_count=1`).then((res) => {
    deckId = res.data.deck_id;
    $btn.show();
    // console.log(res);
  });

  $btn.on("click", function () {
    axios
      .get(`${baseUrl}/${deckId}/draw/`)
      .then((res) => {
        // console.log(res);
        // rotating angles for css translate
        let cardSrc = res.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
          $("<img>", {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
            },
          })
        );
        if (res.data.remaining === 0) $btn.remove();
      })
      .catch((err) => console.log(err));
  });
}
