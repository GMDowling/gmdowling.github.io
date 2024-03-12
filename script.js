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

  function createCard(data) {
    // Create the outer card div
    const card = document.createElement('div');
    card.className = 'card';
  
    // Create the card content div
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
  
    // Create the card image container and image element
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    const img = document.createElement('img'); // Assuming you want to display an image
    img.src = data.image; // Set the source of the image
    cardImage.appendChild(img);
  
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
  
    // Append the image and info wrapper to the card content
    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardInfoWrapper);
  
    // Finally, append the card content to the card
    card.appendChild(cardContent);
  
    return card;
  }

document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}