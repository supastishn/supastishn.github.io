---
layout: page
title: Comics
permalink: /comics/
---

<div class="comics-list">
  <h1>All Comics</h1>
  
  <div class="archive-description">
    Browse all published comics below. Click on any title to view the full comic.
  </div>
  
  <table class="comic-archive">
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
    {% assign sorted_comics = site.comics | sort: 'date' %}
    {% for comic in sorted_comics %}
      {% unless comic.url contains "comic-template" or comic.published == false %}
      <tr class="comic-item">
        <td class="comic-number">{{ forloop.index }}</td>
        <td class="comic-date">{{ comic.date | date: "%Y-%m-%d" }}</td>
        <td class="comic-title"><a href="{{ comic.url | relative_url }}" class="comic-link">{{ comic.title }}</a></td>
      </tr>
      {% endunless %}
    {% endfor %}
    </tbody>
  </table>
  
  <div class="comic-navigation">
    <a href="/" class="home-link">Back to Home</a>
    {% assign first_comic = sorted_comics | first %}
    <a href="{{ first_comic.url }}" class="first-comic">Start Reading</a>
    {% assign latest_comic = sorted_comics | last %}
    <a href="{{ latest_comic.url }}" class="latest-comic">Latest Comic</a>
  </div>
</div>

<style>
  .comics-list {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .archive-description {
    margin-bottom: 20px;
    color: #666;
  }
  
  .comic-archive {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
  }
  
  .comic-archive th {
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #ddd;
    background-color: #f8f8f8;
  }
  
  .comic-item td {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .comic-number {
    width: 50px;
    text-align: center;
  }
  
  .comic-date {
    width: 120px;
    color: #666;
  }
  
  .comic-link {
    text-decoration: none;
    color: #0366d6;
  }
  
  .comic-link:hover {
    text-decoration: underline;
  }
  
  .comic-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .comic-navigation a {
    padding: 8px 16px;
    background-color: #f0f0f0;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .comic-navigation a:hover {
    background-color: #ddd;
  }
</style>