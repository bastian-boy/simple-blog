import { Post } from "@/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // You'll need to install this

// Helper function to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const postsDirectory = path.join(process.cwd(), "_posts");

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      content,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
    };
  });
}

// Get a single post by its ID
export function getPostById(id: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      content,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
    };
  } catch (e) {
    return undefined;
  }
}

// Get all unique tags from posts
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}

// Filter posts by tag
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

// Sort posts by date (newest first)
export function getSortedPosts(): Post[] {
  return getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
