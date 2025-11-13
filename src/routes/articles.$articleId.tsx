import { Link, createFileRoute } from '@tanstack/react-router'

import { useGetById } from '@/service/articles'
import MDEditor from '@uiw/react-md-editor'

export const Route = createFileRoute('/articles/$articleId')({
  component: ArticlePage,
})

function ArticlePage() {
  const { articleId } = Route.useParams()
  const { data: article, isLoading, isError } = useGetById(articleId)

  if (isLoading) {
    return (
      <article className="h-full overflow-auto bg-neutral-900 px-6 py-8 text-neutral-300">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="h-6 w-32 animate-pulse rounded bg-neutral-800" />
          <div className="h-10 w-full animate-pulse rounded bg-neutral-800" />
          <div className="h-20 w-full animate-pulse rounded bg-neutral-900" />
          <div className="h-96 w-full animate-pulse rounded bg-neutral-900" />
        </div>
      </article>
    )
  }

  if (isError || !article) {
    return (
      <article className="h-full overflow-auto bg-neutral-900 px-6 py-8 text-neutral-200">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">
            Статья не найдена
          </h1>
          <Link
            to="/articles"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
          >
            Вернуться к списку
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="h-full overflow-auto px-6 py-8 bg-neutral-900 text-neutral-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <section className="prose prose-invert max-w-none">
          <MDEditor.Markdown
            source={article.text || 'Вернитесь в редактор и напишите статью'}
            style={{ whiteSpace: 'pre-wrap', backgroundColor: 'inherit' }}
          />
          {!article.text && (
            <>
              <div>
                <Link
                  to={`/e/articles/${article.id}` as any}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  Редактировать статью
                </Link>
              </div>
              <div>
                <Link
                  to="/articles"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  Вернуться к списку
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </article>
  )
}
