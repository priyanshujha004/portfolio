import { Feed } from "feed";
import { getAllPosts } from "./mdx";

const siteUrl = "https://priyanshujha.dev";

export function generateRssFeed() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: "Priyanshu Jha — Dispatches",
    description: "Notes, insights and deep dives from my engineering journey.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Priyanshu Jha`,
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
    });
  });

  return feed.rss2();
}
