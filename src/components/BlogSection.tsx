import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const categoryStyles: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-400',
  purple: 'bg-purple-200 text-purple-300',
  pink: 'bg-pink-200 text-pink-400',
}

const borderStyles: Record<string, string> = {
  orange: 'border-orange-300',
  purple: 'border-purple-300',
  pink: 'border-pink-300',
}

export const BlogSection = () => {
    return (
        <div className="bg-light-grey py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center lg:mx-auto">
                    <span className="inline-block text-3xl mb-2">📝</span>
                    <h2 className="text-4xl font-bold text-dark-grey sm:text-5xl">Blogs & conseils</h2>
                    <p className="mt-2 text-lg text-text-secondary">Découvrez vos toutous !</p>
                </div>
                <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className={`block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 border-t-4 ${borderStyles[post.categoryColor]} group`}
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-3 text-xs mb-4">
                                    <time className="text-text-secondary">{post.date}</time>
                                    <span className={`font-medium rounded-full px-3 py-1 ${categoryStyles[post.categoryColor]}`}>
                                        {post.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-dark-grey mb-3 group-hover:text-orange-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                            </div>
                            <div className="px-6 pb-6 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-linear-to-br ${post.authorGradient} flex items-center justify-center text-white text-sm font-bold`}>
                                    {post.authorInitials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-dark-grey">{post.author}</p>
                                    <p className="text-xs text-text-secondary">{post.authorRole}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}