import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = params; // Remove 'await' here - params is not a Promise
  const post = getPostById(id); // Remove 'await' here - getPostById is not async

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="text-gray-500 mb-8">{formattedDate}</div>
        <div
          className="prose prose-h1:text-4xl prose-h1:font-bold prose-h1:text-white 
                       prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-white
                       prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-white
                       prose-p:text-inherit max-w-none"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
