fetch('storage/entries/manifest.json')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      fetch(file) // Assumes file contains the path e.g., "data/card1.json"
        .then(response => response.json())
        .then(data => {
          const card = createCard(data); // Function to create card element
          document.getElementById("cards").appendChild(card);
        });
    });
  });

document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}

// Align on initial load
alignWatermarkWithCards();

// Realign on window resize
window.addEventListener('resize', alignWatermarkWithCards);

function createCard(data) {
  // Create the outer card div
  const card = document.createElement('div');
  card.className = 'card';

  // Create the card content div
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  // Create the card text box container and text element
  const cardTextBox = document.createElement('div');
  cardTextBox.className = 'card-text-box';
  const textBox = document.createElement('div'); // Create a div for the text box
  textBox.className = 'text-box-content'; // Add class for styling
  textBox.textContent = data.abbr; // Set the text content to the "abbr" value
  cardTextBox.appendChild(textBox);

  // Create the info wrapper
  const cardInfoWrapper = document.createElement('div');
  cardInfoWrapper.className = 'card-info-wrapper';

  // Create the card info div
  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';

  // Create the title and subtitle elements
  const cardInfoTitle = document.createElement('div');
  cardInfoTitle.className = 'card-info-title';
  
  const title = document.createElement('h3');
  title.textContent = data.title;
  
  const subtitle = document.createElement('h4');
  subtitle.textContent = data.subtitle;

  // Append the title and subtitle to their container
  cardInfoTitle.appendChild(title);
  cardInfoTitle.appendChild(subtitle);

  // Append the card info title to the card info
  cardInfo.appendChild(cardInfoTitle);

  // Append the card info to the card info wrapper
  cardInfoWrapper.appendChild(cardInfo);

  // Append the text box and info wrapper to the card content
  cardContent.appendChild(cardTextBox);
  cardContent.appendChild(cardInfoWrapper);

  // Finally, append the card content to the card
  card.appendChild(cardContent);

  return card;
}

function alignWatermarkWithCards() {
  const cardsContainer = document.getElementById("cards");
  const watermark = document.querySelector(".watermark");
  if (cardsContainer && watermark) {
    const containerRect = cardsContainer.getBoundingClientRect();
    const watermarkRect = watermark.getBoundingClientRect();
    // const leftOffset = containerRect.left - watermarkRect.width / 2;
    const leftOffset = containerRect.left - watermarkRect.width;
    watermark.style.left = `${leftOffset}px`;
    watermark.style.transform = 'translateX(0%)'; // Adjust if necessary for your layout
  }
}