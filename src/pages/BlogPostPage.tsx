import { useParams, Link, Navigate } from 'react-router-dom'
import { getBlogPost } from '../data/blogPosts'

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPost(slug || '')

  if (!post) {
    return <Navigate to="/" replace />
  }

  const colorMap: Record<string, string> = {
    orange: 'border-orange-300 bg-orange-100 text-orange-400',
    purple: 'border-purple-300 bg-purple-200 text-purple-300',
    pink: 'border-pink-300 bg-pink-200 text-pink-400',
  }
  const tagStyle = colorMap[post.categoryColor] || colorMap.orange

  return (
    <div className="min-h-screen bg-light-grey">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-orange-400 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </Link>

        <article className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className={`h-48 md:h-64 bg-gradient-to-br ${post.authorGradient} flex items-center justify-center`}>
            <span className="text-7xl md:text-8xl">🐾</span>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <time className="text-sm text-text-secondary">{post.date}</time>
              <span className={`text-xs font-medium rounded-full px-3 py-1 border ${tagStyle}`}>
                {post.category}
              </span>
              <span className="text-xs text-text-secondary">{post.readTime} de lecture</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-dark-grey mb-8">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none text-dark-grey">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-dark-grey mt-10 mb-4">{line.slice(3)}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-dark-grey mt-8 mb-3">{line.slice(4)}</h3>
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*(.*)/)
                  if (match) {
                    return (
                      <p key={i} className="ml-4 mb-2 text-dark-grey">
                        <span className="font-bold">{match[1]}</span>{match[2]}
                      </p>
                    )
                  }
                }
                if (line.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-bold text-dark-grey mt-8 mb-3">{line.slice(4)}</h3>
                }
                if (line.trim() === '') {
                  return <div key={i} className="h-4" />
                }
                return <p key={i} className="text-dark-grey leading-relaxed mb-4">{line}</p>
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${post.authorGradient} flex items-center justify-center text-white text-lg font-bold`}>
                  {post.authorInitials}
                </div>
                <div>
                  <p className="text-lg font-semibold text-dark-grey">{post.author}</p>
                  <p className="text-sm text-text-secondary">{post.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voir tous les articles
          </Link>
        </div>
      </div>
    </div>
  )
}
