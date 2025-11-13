import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

import { useListArticles } from '@/service/articles'
import { Article } from '@/shared/adapters/articles'

export const Route = createFileRoute('/articles/')({
  component: ArticlesIndex,
})

function ArticlesIndex() {
  const {
    data: articles,
    isLoading,
    isError,
    error,
    refetch,
  } = useListArticles()

  const cards = useMemo(() => (articles ?? []).map(Article.fromRaw), [articles])

  return (
    <section className="h-full overflow-auto px-6 py-8">
      <div className="mx-auto max-w-5xl flex flex-col gap-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Список статей</h1>
          <p className="text-neutral-400">
            Подборка свежих материалов о TanStack экосистеме, разработке
            интерфейсов и инструментах продуктивности.
          </p>

          {isError && (
            <div className="rounded-lg border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
              Не удалось загрузить список статей: {error?.message ?? 'Ошибка'}
              <button
                type="button"
                onClick={() => refetch()}
                className="ml-3 inline-flex items-center gap-2 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-1 text-xs text-red-200 transition hover:bg-red-500/20"
              >
                Повторить
              </button>
            </div>
          )}
        </header>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-xl border border-neutral-800 bg-neutral-950/40 p-6"
              >
                <div className="flex items-center justify-between text-sm text-neutral-600">
                  <span className="h-4 w-24 rounded bg-neutral-800" />
                  <span className="h-4 w-16 rounded bg-neutral-800" />
                </div>
                <div className="mt-4 h-6 w-3/4 rounded bg-neutral-800" />
                <div className="mt-3 h-16 rounded bg-neutral-900" />
                <div className="mt-4 flex gap-2">
                  <span className="h-6 w-16 rounded bg-neutral-800" />
                  <span className="h-6 w-20 rounded bg-neutral-800" />
                </div>
                <div className="mt-6 h-9 w-28 rounded bg-neutral-800" />
              </div>
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 text-neutral-300">
            <p>
              Пока нет ни одной статьи. Добавьте новую через редактор на главной
              странице.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((article) => (
              <article
                key={article.id}
                className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:border-cyan-500/60"
              >
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {article.title || 'Без названия'}
                </h2>
                <p className="mt-3 text-neutral-300">
                  {article.description || 'Без описания'}
                </p>
                <Link
                  to={`/articles/${article.id}` as any}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  Открыть статью
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
