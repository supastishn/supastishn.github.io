document.addEventListener('DOMContentLoaded', function() {
  if (typeof React !== 'undefined' && 
      typeof ReactDOM !== 'undefined' && 
      document.getElementById('comic-container')) {
    
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
    
    const comicContainer = document.getElementById('comic-container');
    const comicData = {
      title: comicContainer.getAttribute('data-title'),
      imageUrl: comicContainer.getAttribute('data-image'),
      altText: comicContainer.getAttribute('data-alt'),
      hoverText: comicContainer.getAttribute('data-hover'),
      caption: comicContainer.getAttribute('data-caption')
    };
    
    ReactDOM.render(
      React.createElement(ComicStrip, comicData),
      comicContainer
    );
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const comicParam = urlParams.get('comic');
  
  if (window.location.pathname === '/' && document.getElementById('comic-jumper')) {
    if (comicParam) {
      document.getElementById('comic-number').placeholder = comicParam;
    }
  }
});
