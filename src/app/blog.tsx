import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-8">
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="text-gray-500 mb-2">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </div>
              <p className="text-gray-700">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
