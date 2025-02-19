import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <article className="max-w-2xl mx-auto">
        <div className="prose prose-h1:text-4xl prose-h1:font-bold prose-h1:text-white prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-white prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-white prose-p:text-inherit max-w-none">
          <ReactMarkdown
            components={{
              img: (props) => (
                <div className="relative w-full h-[400px] my-8">
                  <Image
                    src={props.src || ""}
                    alt={props.alt || ""}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
