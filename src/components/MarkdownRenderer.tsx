import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-8 mb-4 text-slate-900">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-3xl font-semibold mt-6 mb-3 text-slate-800">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mt-5 mb-2 text-slate-800">
                        {children}
                    </h3>
                ),
                h4: ({ children }) => (
                    <h4 className="text-xl font-medium mt-4 mb-2 text-slate-700">
                        {children}
                    </h4>
                ),
                p: ({ children }) => (
                    <p className="text-base leading-7 text-slate-600 mb-4">
                        {children}
                    </p>
                ),
                code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || "")

                    if (match) {
                        return (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg text-sm my-4 overflow-x-auto max-w-5xl"
                                customStyle={{
                                    padding: "1rem",
                                    borderRadius: "0.75rem",
                                }}
                            >

                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        )
                    }

                    return (
                        <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm">
                            {children}
                        </code>
                    )
                }

            }}
        >
            {content}
        </ReactMarkdown>
    )
}
