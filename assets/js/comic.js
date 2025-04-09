// Comic component for displaying comics on the main page
document.addEventListener('DOMContentLoaded', function() {
  // Check if React is loaded and if the comic container exists
  if (typeof React !== 'undefined' && 
      typeof ReactDOM !== 'undefined' && 
      document.getElementById('comic-container')) {
    
    // Comic component to display the title and image
    function ComicStrip(props) {
      return React.createElement('div', { className: 'comic-strip' },
        React.createElement('h1', { className: 'comic-title' }, props.title),
        React.createElement('div', { className: 'comic-image-container' },
          React.createElement('img', { 
            src: props.imageUrl, 
            alt: props.altText || props.title,
            className: 'comic-image',
            title: props.hoverText || '' // For xkcd-style hover text
          })
        ),
        props.caption && React.createElement('p', { className: 'comic-caption' }, props.caption)
      );
    }
    
    // Get comic data from the page
    const comicContainer = document.getElementById('comic-container');
    const comicData = {
      title: comicContainer.getAttribute('data-title'),
      imageUrl: comicContainer.getAttribute('data-image'),
      altText: comicContainer.getAttribute('data-alt'),
      hoverText: comicContainer.getAttribute('data-hover'),
      caption: comicContainer.getAttribute('data-caption')
    };
    
    // Render the comic
    ReactDOM.render(
      React.createElement(ComicStrip, comicData),
      comicContainer
    );
  }
  
  // Handle URL parameter for comics
  const urlParams = new URLSearchParams(window.location.search);
  const comicParam = urlParams.get('comic');
  
  // If we're on the home page and need to update the comic number
  if (window.location.pathname === '/' && document.getElementById('comic-jumper')) {
    // Update input placeholder if comic parameter is present
    if (comicParam) {
      document.getElementById('comic-number').placeholder = comicParam;
    }
  }
});