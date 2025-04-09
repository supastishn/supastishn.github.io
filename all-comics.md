---
layout: default
title: All Comics
permalink: /all-comics/
---

<div class="all-comics-page">
  <h1>All Comics</h1>
  
  <div class="comics-list">
    {% assign sorted_comics = site.comics | sort: 'date' | reverse %}
    {% for comic in sorted_comics %}
      {% assign comic_number = site.comics.size | minus: forloop.index0 %}
      <div class="comic-item">
        <a href="/?comic={{ comic_number }}" class="comic-link">
          <div class="comic-thumbnail">
            <img src="{{ comic.comic_image }}" alt="{{ comic.alt_text }}">
          </div>
          <div class="comic-info">
            <h3 class="comic-title">#{{ comic_number }}: {{ comic.title }}</h3>
            <div class="comic-date">{{ comic.date | date: "%B %d, %Y" }}</div>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .all-comics-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .all-comics-page h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .comics-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .comic-item {
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .comic-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .comic-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  .comic-thumbnail {
    height: 180px;
    overflow: hidden;
  }
  
  .comic-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .comic-item:hover .comic-thumbnail img {
    transform: scale(1.05);
  }
  
  .comic-info {
    padding: 15px;
  }
  
  .comic-title {
    margin: 0 0 10px 0;
    font-size: 18px;
  }
  
  .comic-date {
    color: #666;
    font-size: 14px;
  }
  
  @media (max-width: 600px) {
    .comics-list {
      grid-template-columns: 1fr;
    }
  }
</style>