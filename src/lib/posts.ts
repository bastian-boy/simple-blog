import { Post } from "@/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");
const publicDirectory = path.join(process.cwd(), "public");

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      content: processImagePaths(content),
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
    };
  });
}

export function processImagePaths(content: string) {
  return content.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, (match, alt, src) => {
    if (src.startsWith("http")) return match;
    const publicPath = `/blog/${src}`;
    return `![${alt}](${publicPath})`;
  });
}

export function getPostById(id: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      content: processImagePaths(content),
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
