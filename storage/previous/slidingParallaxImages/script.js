const track = document.getElementById("image-track");

// Initialization of state variables with default values
track.dataset.prevPercentage = "0"; // Ensure a default value is set
track.dataset.percentage = "0"; // Ensure a default value is set

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  console.log('Mouse down at:', e.clientX); // Debug: Log mouse down position
}

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  console.log('Mouse up'); // Debug: Log mouse up event
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || "0") + percentage, // Use || to ensure there is a default value
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 100), -100); // Ensure the range is between -100 and 100
  
  track.dataset.percentage = nextPercentage.toString();
  
  console.log(`Moving: percentage=${nextPercentage}`); // Debug: Log current percentage
  
  // Apply direct manipulation for the demonstration of instant feedback
  track.style.transform = `translate(${nextPercentage}%, -50%)`;
  
  for(const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
}

// Adjust for touch end event handling
window.ontouchend = e => {
  // Use changedTouches for touchend event
  if (e.changedTouches && e.changedTouches.length > 0) {
    handleOnUp(e.changedTouches[0]);
  } else {
    handleOnUp();
  }
};

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp();
window.ontouchend = e => handleOnUp(); // Corrected as above
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);