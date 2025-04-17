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
    <div class="comic-number"></div>
    
    <div id="comic-container"></div>
    
    <div class="comic-date"></div>
    
    <div class="comic-content"></div>
    
    <div class="comic-navigation">
      <div class="nav-buttons">
        <a href="/?comic=1" class="first-comic" title="First Comic">&laquo;</a>
        <a href="#" class="prev-comic" title="Previous Comic">&#8249; Previous</a>
        <a href="/all-comics/" class="all-comics">All Comics</a>
        <a href="#" class="next-comic" title="Next Comic">Next &#8250;</a>
        <a href="#" class="last-comic" title="Latest Comic">&raquo;</a>
      </div>
      
      <div class="comic-jump">
        <form id="comic-jumper" action="javascript:void(0);" onsubmit="jumpToComic(this)">
          <label for="comic-number">Go to comic #:</label>
          <input type="number" id="comic-number" min="1" max="1" placeholder="1">
          <button type="submit">Go</button>
        </form>
      </div>
    </div>
  </div>
</div>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
<!-- Comics data for JavaScript -->
<script>
  // Store all comics data for client-side navigation
  const comicsData = [
    {% for comic in sorted_comics %}
    {
      title: "{{ comic.title }}",
      image: "{{ comic.comic_image }}",
      altText: "{{ comic.alt_text }}",
      hoverText: "{{ comic.hover_text }}",
      caption: "{{ comic.caption }}",
      date: "{{ comic.date | date: "%B %d, %Y" }}",
      content: `{{ comic.content | strip_newlines | replace: '"', '\\"' }}`
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  
  // Function to jump to a specific comic
  function jumpToComic(form) {
    const comicNumber = parseInt(document.getElementById('comic-number').value, 10);
    
    if (comicNumber && comicNumber >= 1 && comicNumber <= comicsData.length) {
      window.location.href = "/?comic=" + comicNumber;
    }
  }
  
  // Function to display a comic by number
  function displayComic(comicNumber) {
    // Ensure comic number is valid
    if (comicNumber < 1) comicNumber = 1;
    if (comicNumber > comicsData.length) comicNumber = comicsData.length;
    
    // Get comic data (array is 0-indexed, but comics are 1-indexed)
    const comic = comicsData[comicNumber - 1];
    
    // Update comic number display
    document.querySelector('.comic-number').textContent = `Comic #${comicNumber} of ${comicsData.length}`;
    
    // Update comic container data attributes
    const container = document.getElementById('comic-container');
    container.setAttribute('data-title', comic.title);
    container.setAttribute('data-image', comic.image);
    container.setAttribute('data-alt', comic.altText);
    container.setAttribute('data-hover', comic.hoverText);
    container.setAttribute('data-caption', comic.caption);
    
    // Update date
    document.querySelector('.comic-date').textContent = `Published on ${comic.date}`;
    
    // Update content
    document.querySelector('.comic-content').innerHTML = comic.content;
    
    // Update navigation buttons
    const prevButton = document.querySelector('.prev-comic');
    const nextButton = document.querySelector('.next-comic');
    const lastButton = document.querySelector('.last-comic');
    
    if (comicNumber > 1) {
      prevButton.href = `/?comic=${comicNumber - 1}`;
      prevButton.classList.remove('disabled');
    } else {
      prevButton.href = '#';
      prevButton.classList.add('disabled');
    }
    
    if (comicNumber < comicsData.length) {
      nextButton.href = `/?comic=${comicNumber + 1}`;
      nextButton.classList.remove('disabled');
    } else {
      nextButton.href = '#';
      nextButton.classList.add('disabled');
    }
    
    // Update last comic link
    lastButton.href = `/?comic=${comicsData.length}`;
    
    // Update form placeholder
    document.getElementById('comic-number').placeholder = comicNumber;
    document.getElementById('comic-number').max = comicsData.length;
    
    // Ensure React re-renders the comic
    if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
      function ComicStrip(props) {
        return React.createElement('div', { className: 'comic-strip' },
          React.createElement('h1', { className: 'comic-title' }, props.title),
          React.createElement('div', { className: 'comic-image-container' },
            React.createElement('img', { 
              src: props.imageUrl, 
              alt: props.altText || props.title,
              className: 'comic-image',
              title: props.hoverText || ''
            })
          ),
          props.caption && React.createElement('p', { className: 'comic-caption' }, props.caption)
        );
      }
      
      const comicData = {
        title: comic.title,
        imageUrl: comic.image,
        altText: comic.altText,
        hoverText: comic.hoverText,
        caption: comic.caption
      };
      
      ReactDOM.render(
        React.createElement(ComicStrip, comicData),
        container
      );
    }
  }
  
  // On page load, check for comic parameter and display the appropriate comic
  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let comicNumber = urlParams.get('comic');
    
    // If no comic specified, show the latest
    if (!comicNumber) {
      comicNumber = comicsData.length;
      // Update URL without reloading
      window.history.replaceState({}, '', `/?comic=${comicNumber}`);
    }
    
    // Display the comic
    displayComic(parseInt(comicNumber, 10));
  });
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
    margin-bottom: 30px;
  }
  
  .comic-image {
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .comic-caption {
    font-style: italic;
    text-align: center;
    margin-top: 15px;
  }
  
  .comic-navigation {
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
  }
  
  .nav-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .comic-navigation a, .comic-navigation button {
    padding: 8px 16px;
    background-color: #f0f0f0;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.2s;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
  
  .comic-navigation a:hover, .comic-navigation button:hover {
    background-color: #ddd;
  }
  
  .disabled {
    padding: 8px 16px;
    background-color: #f0f0f0;
    color: #aaa;
    border-radius: 4px;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .comic-jump {
    text-align: center;
    margin-top: 15px;
  }
  
  .comic-jump input {
    width: 60px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
  
  .comic-content {
    margin: 30px 0;
    line-height: 1.6;
  }
</style>
