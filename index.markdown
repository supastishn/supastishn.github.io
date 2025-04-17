---
layout: default
---

{% assign sorted_comics = site.comics | sort: 'date' %}
{% assign total_comics = sorted_comics | size %}

<div class="homepage">
  <h1 class="site-title">{{ site.title }}</h1>
  
  <div class="site-description">
    {{ site.description }}
  </div>
  
  <div id="comic-viewer" class="comic-page">
    <!-- Comic content will be loaded via JavaScript -->
    <div class="comic-number">Loading...</div>
    
    <div id="comic-container"><!-- Comic title, image, caption inserted here --></div>
    
    <div class="comic-date"></div>
    
    <div class="comic-content"><!-- Additional comic content inserted here --></div>
    
    <div class="comic-navigation">
      <div class="nav-buttons">
        <a href="/?comic=1" class="first-comic" title="First Comic">&laquo;</a>
        <a href="#" class="prev-comic disabled" title="Previous Comic">&#8249; Previous</a>
        <a href="/all-comics/" class="all-comics">All Comics</a>
        <a href="#" class="next-comic disabled" title="Next Comic">Next &#8250;</a>
        <a href="#" class="last-comic disabled" title="Latest Comic">&raquo;</a>
      </div>
      
      <div class="comic-jump">
        <form id="comic-jumper" action="javascript:void(0);" onsubmit="jumpToComic(this)">
          <label for="comic-number">Go to comic #:</label>
          <input type="number" id="comic-number" min="1" max="{{ total_comics | default: 1 }}" placeholder="1">
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  </div>
</div>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
<!-- Comics data and display logic -->
<script>
  console.log("Index page inline script started.");
  // Store all comics data for client-side navigation
  const comicsData = [
    {% for comic in sorted_comics %}
    {
      title: {{ comic.title | default: "Untitled" | jsonify }},
      // Ensure baseurl is included if needed, or paths are absolute
      image: "{{ site.baseurl }}{{ comic.comic_image }}", 
      altText: {{ comic.alt_text | jsonify }},
      hoverText: {{ comic.hover_text | jsonify }},
      caption: {{ comic.caption | jsonify }},
      date: "{{ comic.date | date: '%B %d, %Y' }}",
      // Ensure content escaping handles quotes and newlines correctly for JS string literal
      content: {{ comic.content | strip_newlines | jsonify }} 
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  console.log(`Loaded ${comicsData.length} comics data.`);
  
  // Function to jump to a specific comic by updating URL
  function jumpToComic(form) {
    const comicNumberInput = document.getElementById('comic-number');
    const comicNumber = parseInt(comicNumberInput.value, 10);
    
    if (comicNumber && comicNumber >= 1 && comicNumber <= comicsData.length) {
      console.log(`Jumping to comic number: ${comicNumber}`);
      // Navigate, letting the page reload and DOMContentLoaded handle display
      window.location.href = "/?comic=" + comicNumber; 
    } else {
       console.warn(`Invalid comic number entered: ${comicNumberInput.value}`);
       comicNumberInput.value = ''; // Clear invalid input
    }
  }
  
  // Function to display a comic by number (updates the DOM)
  function displayComic(comicNumber) {
    console.log(`Attempting to display comic number: ${comicNumber}`);
    // Ensure comic number is within valid range
    if (!comicsData || comicsData.length === 0) {
        console.error("No comics data available to display.");
        // Display error in container?
        const container = document.getElementById('comic-container');
        if(container) container.innerHTML = '<p style="color: red;">Error: No comics loaded.</p>';
        return;
    }
    if (comicNumber < 1) comicNumber = 1;
    if (comicNumber > comicsData.length) comicNumber = comicsData.length;
    
    // Get comic data (array is 0-indexed, comics are 1-indexed)
    const comic = comicsData[comicNumber - 1];
    
    if (!comic) {
        console.error(`Comic data not found for index ${comicNumber - 1}`);
        return; // Stop if data is somehow missing
    }
    console.log("Selected comic data:", comic);

    // --- Update UI Elements ---

    // 1. Update Comic Number Display
    const comicNumEl = document.querySelector('.comic-number');
    if(comicNumEl) {
        comicNumEl.textContent = `Comic #${comicNumber} of ${comicsData.length}`;
    } else { console.warn("Element '.comic-number' not found."); }
    
    // 2. Update Comic Container (Title, Image, Caption)
    const container = document.getElementById('comic-container');
    if (container) {
        console.log("Updating #comic-container content.");
        // Clear previous content
        container.innerHTML = ''; 

        // Check for image URL before proceeding with rendering inside container
        if (!comic.image) {
            console.error("Error: Comic data is missing the image URL.");
            const errorP = document.createElement('p');
            errorP.style.color = 'red';
            errorP.style.textAlign = 'center';
            errorP.textContent = 'Error: Comic image URL not found in data.';
            container.appendChild(errorP);
        } else {
            // Create and append the title
            const titleH1 = document.createElement('h1');
            titleH1.className = 'comic-title';
            titleH1.textContent = comic.title || 'Comic'; 
            container.appendChild(titleH1);
            console.log("Appended comic title:", titleH1.textContent);
            
            // Create image container div
            const imageContainerDiv = document.createElement('div');
            imageContainerDiv.className = 'comic-image-container';
            console.log("Created image container div.");
            
            // Create the image element
            const imageElement = document.createElement('img');
            imageElement.src = comic.image; // Use the path from comicsData
            imageElement.alt = comic.altText || comic.title || 'Comic Image'; 
            imageElement.title = comic.hoverText || ''; 
            imageElement.className = 'comic-image';
            console.log("Created image element with src:", imageElement.src);
            
            // Append image to its container div
            imageContainerDiv.appendChild(imageElement);
            console.log("Appended image element to its container.");
            
            // Append image container div to the main comic container
            container.appendChild(imageContainerDiv);
            console.log("Appended image container div to main comic container.");
            
            // Create and append the caption if it exists
            if (comic.caption) {
                console.log("Caption found:", comic.caption);
                const captionP = document.createElement('p');
                captionP.className = 'comic-caption';
                captionP.textContent = comic.caption; // Use textContent for safety unless HTML is intended
                container.appendChild(captionP);
                console.log("Appended caption paragraph.");
            } else {
                console.log("No caption found in comic data.");
            }
        }
    } else {
        console.error("#comic-container not found during displayComic call");
    }
    
    // 3. Update Date
    const dateEl = document.querySelector('.comic-date');
    if(dateEl) {
        dateEl.textContent = `Published on ${comic.date}`;
    } else { console.warn("Element '.comic-date' not found."); }
    
    // 4. Update Content Area
    const contentEl = document.querySelector('.comic-content');
    if(contentEl) {
        // Use innerHTML carefully, assuming comic.content is trusted/sanitized
        contentEl.innerHTML = comic.content || ''; 
    } else { console.warn("Element '.comic-content' not found."); }
    
    // 5. Update Navigation Buttons State and Links
    const prevButton = document.querySelector('.prev-comic');
    const nextButton = document.querySelector('.next-comic');
    const lastButton = document.querySelector('.last-comic');
    const firstButton = document.querySelector('.first-comic'); 
    
    if (prevButton && nextButton && lastButton && firstButton) {
        console.log("Updating navigation buttons state.");
        firstButton.href = `/?comic=1`; // Always link to first
        firstButton.classList.remove('disabled'); // First is never disabled

        if (comicNumber > 1) {
          prevButton.href = `/?comic=${comicNumber - 1}`;
          prevButton.classList.remove('disabled');
        } else {
          prevButton.href = '#'; // Prevent navigation
          prevButton.classList.add('disabled');
        }
        
        if (comicNumber < comicsData.length) {
          nextButton.href = `/?comic=${comicNumber + 1}`;
          nextButton.classList.remove('disabled');
        } else {
          nextButton.href = '#'; // Prevent navigation
          nextButton.classList.add('disabled');
        }
        
        lastButton.href = `/?comic=${comicsData.length}`;
        if (comicsData.length > 0) {
            lastButton.classList.remove('disabled'); // Enable if comics exist
        } else {
            lastButton.classList.add('disabled');
        }

    } else {
        console.warn("One or more navigation buttons (.first-comic, .prev-comic, .next-comic, .last-comic) not found.");
    }
        
    // 6. Update Comic Jumper Form Input
    const comicNumberInput = document.getElementById('comic-number');
    if (comicNumberInput) {
        console.log("Updating comic jumper input placeholder and max value.");
        comicNumberInput.placeholder = comicNumber;
        comicNumberInput.value = ''; // Clear any typed value after display
        comicNumberInput.max = comicsData.length;
        comicNumberInput.min = 1; // Ensure min is set
    } else {
        console.warn("#comic-number input not found.");
    }
    
    // 7. Update Browser History (optional, prevents breaking back button)
    const currentUrl = `/?comic=${comicNumber}`;
    if (window.location.search !== `?comic=${comicNumber}`) {
       // Use replaceState if we are just correcting the URL on initial load
       // Use pushState if we are navigating via prev/next (handled by page reload now)
       // For initial load correction:
       // window.history.replaceState({comic: comicNumber}, `Comic ${comicNumber}`, currentUrl);
       // console.log("Updated browser history state.");
    }

    console.log(`Finished displaying comic number: ${comicNumber}`);
  } // End of displayComic function
  
  // --- Initial Load Logic ---
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded. Initializing comic display.");
    const urlParams = new URLSearchParams(window.location.search);
    let comicNumberParam = urlParams.get('comic');
    let targetComicNumber;

    if (comicNumberParam) {
        console.log(`Found 'comic' parameter in URL: ${comicNumberParam}`);
        targetComicNumber = parseInt(comicNumberParam, 10);
        // Validate the number from URL
        if (isNaN(targetComicNumber) || targetComicNumber < 1 || targetComicNumber > comicsData.length) {
            console.warn(`Invalid comic number '${comicNumberParam}' in URL. Showing latest instead.`);
            targetComicNumber = comicsData.length;
            // Optionally update URL to reflect the correction
             window.history.replaceState({comic: targetComicNumber}, ``, `/?comic=${targetComicNumber}`);
        }
    } else {
      // If no comic specified, or comicsData is empty, show the latest (or 1 if empty)
      console.log("No 'comic' parameter in URL. Determining latest comic.");
      targetComicNumber = comicsData.length > 0 ? comicsData.length : 1;
      // Update URL without reloading to show the current comic number
      // Only do this if comics exist to avoid showing comic=1 for an empty list
      if (comicsData.length > 0) {
        window.history.replaceState({comic: targetComicNumber}, ``, `/?comic=${targetComicNumber}`);
        console.log(`Updated URL to show latest comic: /?comic=${targetComicNumber}`);
      }
    }
    
    // Display the determined comic
    displayComic(targetComicNumber);
  }); // End of DOMContentLoaded listener

</script>

<style>
  .homepage {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .site-title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .site-description {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
  }
  
  .comic-page {
    margin-top: 20px;
  }
  
  .comic-number {
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  
  #comic-container { /* Style the container itself if needed */
    margin-bottom: 10px; /* Add space before date */
  }

  .comic-date {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 5px;
    font-style: italic;
  }
  
  .comic-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .comic-image-container {
    text-align: center;
    margin-bottom: 15px; /* Reduced margin */
  }
  
  .comic-image {
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: block; /* Prevents potential extra space below image */
    margin: 0 auto; /* Ensure centering */
  }
  
  .comic-caption {
    font-style: italic;
    text-align: center;
    margin-top: 10px; /* Reduced margin */
    margin-bottom: 15px; /* Add space before date/content */
    color: #555;
  }
  
  .comic-navigation {
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
  }
  
  .nav-buttons {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
    justify-content: space-between;
    gap: 10px; /* Add gap between buttons */
    margin-bottom: 15px;
  }
  
  .comic-navigation a, .comic-navigation button {
    padding: 8px 12px; /* Slightly smaller padding */
    background-color: #f0f0f0;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.2s;
    border: 1px solid #ccc; /* Add subtle border */
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    flex-grow: 1; /* Allow buttons to grow */
  }

  /* Provide min-width for better spacing on wrap */
  .comic-navigation a.first-comic, 
  .comic-navigation a.last-comic {
     min-width: 40px; 
     flex-grow: 0; /* Don't grow first/last as much */
  }
   .comic-navigation a.prev-comic, 
   .comic-navigation a.next-comic {
     min-width: 90px;
   }
   .comic-navigation a.all-comics {
        min-width: 90px;
   }


  .comic-navigation a:hover, .comic-navigation button:hover {
    background-color: #ddd;
  }
  
  .disabled {
    background-color: #e9e9e9; /* Lighter disabled background */
    color: #aaa;
    cursor: not-allowed;
    pointer-events: none; /* Make sure it's not clickable */
    border-color: #ddd;
  }
  
  .comic-jump {
    text-align: center;
    margin-top: 15px;
  }
  
  .comic-jump label {
    margin-right: 5px;
  }

  .comic-jump input {
    width: 60px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    margin-right: 5px;
  }
  
  .comic-content {
    margin: 20px 0; /* Adjusted margin */
    line-height: 1.6;
    border-top: 1px solid #eee; /* Separator */
    padding-top: 20px; /* Space above content */
  }
</style>
