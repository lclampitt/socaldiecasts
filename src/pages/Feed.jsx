import React from 'react'
import './Feed.css'

const POSTS = [
  {
    id: 1,
    date: 'March 15, 2026',
    title: 'New Kyle Larson Daytona Elite Premier Just Arrived!',
    body: 'We just received a fresh shipment of the 2026 Kyle Larson Daytona Elite Premier die-casts. These feature opening hoods, real rubber tires, and incredible detail. Limited quantities available!',
    tag: 'New Arrival',
  },
  {
    id: 2,
    date: 'March 10, 2026',
    title: 'Raced Win Replicas — Why They\'re Worth It',
    body: 'Raced win die-casts are replicas of the exact paint scheme the car wore when it crossed the finish line first. They\'re authenticated and numbered, making them some of the most valuable pieces in any collection.',
    tag: 'Collector Tips',
  },
  {
    id: 3,
    date: 'March 5, 2026',
    title: 'Free Shipping Now on All Orders Over $75',
    body: 'We\'ve lowered our free shipping threshold! Any order over $75 now ships free anywhere in the continental United States. Stock up and save on shipping.',
    tag: 'Announcement',
  },
]

export default function Feed() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>News & Updates</h1>
          <p>Stay up to date with new arrivals and collector tips</p>
        </div>
      </div>
      <div className="container feed-layout">
        <div className="feed-posts">
          {POSTS.map(post => (
            <article key={post.id} className="feed-post fade-in">
              <div className="feed-post-meta">
                <span className="feed-tag">{post.tag}</span>
                <span className="feed-date">{post.date}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
