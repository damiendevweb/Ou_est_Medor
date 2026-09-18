import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export const BlogPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-5 py-12">
            <div className="mb-12">
                <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-3">
                    Blog
                </h1>
                <p className="text-sm text-text-secondary">
                    Conseils, astuces et actualités pour votre compagnon à quatre pattes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group bg-bg-elevated border border-border rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                        <div className="h-40 bg-bg-surface flex items-center justify-center">
                            <span className="text-4xl">🐾</span>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center gap-2 text-[10px] mb-3">
                                <span className="bg-accent-dim text-accent rounded px-1.5 py-0.5 font-medium">
                                    {post.category}
                                </span>
                                <time className="text-text-muted">{post.date}</time>
                                <span className="text-text-muted">· {post.readTime}</span>
                            </div>

                            <h2 className="text-base font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
                                {post.title}
                            </h2>

                            <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-accent-dim flex items-center justify-center text-[9px] font-bold text-accent">
                                    {post.authorInitials}
                                </div>
                                <span className="text-[11px] text-text-muted">{post.author}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
