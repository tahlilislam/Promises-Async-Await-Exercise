drawCards();
oneCard();
twoCardsFromDeck();

async function oneCard() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";
  try {
    const { data } = await axios.get(`${baseUrl}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  } catch (e) {
    console.log(e.message, e);
  }
}

async function twoCardsFromDeck() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";
  try {
    let {
      data: d1,
      data: { deck_id: deckId },
    } = await axios.get(`${baseUrl}/new/draw/`);

    let firstCard = d1.cards[0];
    let { data: d2 } = await axios.get(`${baseUrl}/${deckId}/draw/`);
    let secondCard = d2.cards[0];
    [firstCard, secondCard].forEach((card) => {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  } catch (e) {
    console.log(e.message, e);
  }
}

async function drawCards() {
  let baseUrl = "https://deckofcardsapi.com/api/deck";

  try {
    let $btn = $("button");
    let $cardArea = $("#card-area");

    let {
      data: d1,
      data: { deck_id: deckId },
    } = await axios.get(`${baseUrl}/new/shuffle/?deck_count=1`);
    $btn.show();
    console.log(d1);
    $btn.on("click", async function () {
      let { data: d2 } = await axios.get(`${baseUrl}/${deckId}/draw/`);
      let cardSrc = d2.cards[0].image;
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
      console.log(d2.remaining);
      if (d2.remaining === 0) $btn.remove();
    });
  } catch (e) {
    console.log(e.message, e);
  }
}
