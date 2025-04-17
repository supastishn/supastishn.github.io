document.addEventListener('DOMContentLoaded', function() {
  const comicContainer = document.getElementById('comic-container');

  // --- Start: Comic Rendering Logic ---
  if (comicContainer) {
    const comicData = {
      title: comicContainer.getAttribute('data-title'),
      imageUrl: comicContainer.getAttribute('data-image'),
      altText: comicContainer.getAttribute('data-alt'),
      hoverText: comicContainer.getAttribute('data-hover'),
      caption: comicContainer.getAttribute('data-caption')
    };

    // Clear the container (removing any potential placeholders or previous content)
    comicContainer.innerHTML = ''; 

    // Check if the imageUrl is actually present before attempting to render
    if (!comicData.imageUrl) {
      console.error("Error: No image URL found in data attributes for comic container! Check the 'data-image' attribute in the HTML.");
      // Display an error message directly in the container
      const errorP = document.createElement('p');
      errorP.style.color = 'red';
      errorP.style.textAlign = 'center';
      errorP.textContent = 'Error: Comic image URL not found.';
      comicContainer.appendChild(errorP);
    } else {
      // Create and append the title
      const titleH1 = document.createElement('h1');
      titleH1.className = 'comic-title';
      // Use a default title if none is provided
      titleH1.textContent = comicData.title || 'Comic'; 
      comicContainer.appendChild(titleH1);
      
      // Create image container div
      const imageContainerDiv = document.createElement('div');
      imageContainerDiv.className = 'comic-image-container';
      
      // Create the image element
      const imageElement = document.createElement('img');
      imageElement.src = comicData.imageUrl;
      // Provide fallback alt text using title if altText is missing
      imageElement.alt = comicData.altText || comicData.title || 'Comic Image'; 
      imageElement.title = comicData.hoverText || ''; // Use hoverText for the title attribute
      imageElement.className = 'comic-image';
      
      // Append image to its container div
      imageContainerDiv.appendChild(imageElement);
      
      // Append image container div to the main comic container
      comicContainer.appendChild(imageContainerDiv);
      
      // Create and append the caption if it exists
      if (comicData.caption) {
        const captionP = document.createElement('p');
        captionP.className = 'comic-caption';
        captionP.textContent = comicData.caption;
        comicContainer.appendChild(captionP);
      }
    }
  } else {
    // Log an error if the main container isn't found
    console.error("Error: Element with ID 'comic-container' not found in the DOM.");
  }
  // --- End: Comic Rendering Logic ---

  // --- Start: URL Parameter Logic (for comic jumper) ---
  const urlParams = new URLSearchParams(window.location.search);
  const comicParam = urlParams.get('comic');
  
  // Check if we are on the expected page and the necessary element exists
  if (window.location.pathname === '/' && document.getElementById('comic-jumper')) {
    if (comicParam) {
      const comicNumberInput = document.getElementById('comic-number');
      if (comicNumberInput) {
        // Set the placeholder for the comic number input if a URL param is present
        comicNumberInput.placeholder = comicParam;
      } else {
        console.warn("Element with ID 'comic-number' not found, cannot set placeholder from URL parameter.");
      }
    }
  }
  // --- End: URL Parameter Logic ---
});
