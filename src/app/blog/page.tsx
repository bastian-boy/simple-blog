import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { formatDate } from "@/lib/utils"; // We'll create this

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              {/* Post metadata */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-700 mb-3">{post.description}</p>

              {/* Tags */}
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
