document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed.");

  const comicContainer = document.getElementById('comic-container');
  console.log("Attempting to find comic container element:", comicContainer);

  // --- Start: Comic Rendering Logic ---
  if (comicContainer) {
    console.log("Comic container found.");
    const comicData = {
      title: comicContainer.getAttribute('data-title'),
      imageUrl: comicContainer.getAttribute('data-image'),
      altText: comicContainer.getAttribute('data-alt'),
      hoverText: comicContainer.getAttribute('data-hover'),
      caption: comicContainer.getAttribute('data-caption')
    };
    console.log("Read comic data from attributes:", comicData);

    // Clear the container (removing any potential placeholders or previous content)
    comicContainer.innerHTML = ''; 
    console.log("Cleared comic container innerHTML.");

    // Check if the imageUrl is actually present before attempting to render
    console.log("Checking image URL:", comicData.imageUrl);
    if (!comicData.imageUrl) {
      console.error("Error: No image URL found in data attributes for comic container! Check the 'data-image' attribute in the HTML.");
      // Display an error message directly in the container
      const errorP = document.createElement('p');
      errorP.style.color = 'red';
      errorP.style.textAlign = 'center';
      errorP.textContent = 'Error: Comic image URL not found.';
      comicContainer.appendChild(errorP);
      console.log("Appended image URL error message.");
    } else {
      console.log("Image URL found. Proceeding with rendering.");
      // Create and append the title
      const titleH1 = document.createElement('h1');
      titleH1.className = 'comic-title';
      // Use a default title if none is provided
      titleH1.textContent = comicData.title || 'Comic'; 
      comicContainer.appendChild(titleH1);
      console.log("Appended comic title:", titleH1.textContent);
      
      // Create image container div
      const imageContainerDiv = document.createElement('div');
      imageContainerDiv.className = 'comic-image-container';
      console.log("Created image container div.");
      
      // Create the image element
      const imageElement = document.createElement('img');
      imageElement.src = comicData.imageUrl;
      // Provide fallback alt text using title if altText is missing
      imageElement.alt = comicData.altText || comicData.title || 'Comic Image'; 
      imageElement.title = comicData.hoverText || ''; // Use hoverText for the title attribute
      imageElement.className = 'comic-image';
      console.log("Created image element with src:", imageElement.src);
      
      // Append image to its container div
      imageContainerDiv.appendChild(imageElement);
      console.log("Appended image element to its container.");
      
      // Append image container div to the main comic container
      comicContainer.appendChild(imageContainerDiv);
      console.log("Appended image container div to main comic container.");
      
      // Create and append the caption if it exists
      if (comicData.caption) {
        console.log("Caption found:", comicData.caption);
        const captionP = document.createElement('p');
        captionP.className = 'comic-caption';
        captionP.textContent = comicData.caption;
        comicContainer.appendChild(captionP);
        console.log("Appended caption paragraph.");
      } else {
        console.log("No caption found in data attributes.");
      }
    }
  } else {
    // Log an error if the main container isn't found
    console.error("Error: Element with ID 'comic-container' not found in the DOM.");
  }
  // --- End: Comic Rendering Logic ---

  // --- Start: URL Parameter Logic (for comic jumper) ---
  console.log("Checking URL parameters for comic jumper...");
  const urlParams = new URLSearchParams(window.location.search);
  const comicParam = urlParams.get('comic');
  console.log("URL search parameters:", window.location.search);
  console.log("Parsed 'comic' parameter:", comicParam);
  
  // Check if we are on the expected page and the necessary element exists
  const comicJumperForm = document.getElementById('comic-jumper');
  console.log("Checking for comic jumper form:", comicJumperForm);
  // Checking against '/' might be too restrictive if comics are served from subdirs? 
  // Let's assume the comic layout *always* has the jumper.
  // if (window.location.pathname === '/' && comicJumperForm) { 
  if (comicJumperForm) { // Check if the form exists, regardless of path for now
    console.log("Comic jumper form found.");
    if (comicParam) {
      console.log("'comic' URL parameter detected:", comicParam);
      const comicNumberInput = document.getElementById('comic-number');
      console.log("Checking for comic number input field:", comicNumberInput);
      if (comicNumberInput) {
        // Set the placeholder for the comic number input if a URL param is present
        comicNumberInput.placeholder = comicParam;
        console.log("Set placeholder for comic number input to:", comicParam);
      } else {
        console.warn("Element with ID 'comic-number' not found, cannot set placeholder from URL parameter.");
      }
    } else {
      console.log("No 'comic' URL parameter found.");
    }
  } else {
     console.log("Comic jumper form not found on this page.");
  }
  // --- End: URL Parameter Logic ---
});
