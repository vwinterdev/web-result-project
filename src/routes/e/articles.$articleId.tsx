import { Link, createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'

import { useGetById, useUpdateArticle } from '@/service/articles'

import { Article } from '@/shared/adapters/articles'
import { computeArticleMeta } from '@/shared/utils/computeArticleMeta'

export const Route = createFileRoute('/e/articles/$articleId')({
  component: ArticleEditorPage,
})

function ArticleEditorPage() {
  const { articleId } = Route.useParams()

  const {
    data: fetchedArticle,
    isLoading,
    isError,
    refetch,
  } = useGetById(articleId)

  const {
    mutate: updateArticleMutate,
    isPending: isUpdateArticlePending,
    error: updateArticleError,
  } = useUpdateArticle()

  const [draftArticle, setDraftArticle] = useState<Article | null>(null)
  const [isLoadingSave, setIsLoadingSave] = useState(false)

  useEffect(() => {
    if (draftArticle) return
    if (fetchedArticle) {
      setDraftArticle(fetchedArticle)
    }
  }, [fetchedArticle])

  const handleChange = (nextText?: string) => {
    if (!draftArticle) return
    setIsLoadingSave(true)
    setDraftArticle({ ...draftArticle, text: nextText || '' })
    handleSave()
  }

  const handleSave = useCallback(() => {
    if (!draftArticle) return
    const meta = computeArticleMeta(draftArticle.text)
    const article = Article.fromRaw({
      id: draftArticle.id,
      title: meta.title,
      description: meta.description,
      text: draftArticle.text,
    })
    updateArticleMutate(article)
    setIsLoadingSave(false)
  }, [draftArticle, updateArticleMutate])

  useEffect(() => {
    if (!draftArticle) return

    const intervalId = setInterval(handleSave, 10000)
    return () => clearInterval(intervalId)
  }, [draftArticle, handleSave])

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

  if (isError || !draftArticle) {
    return (
      <article className="h-full overflow-auto bg-neutral-900 px-6 py-8 text-neutral-200">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-semibold text-white">
            Редактор недоступен
          </h1>

          <div className="flex gap-3">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-600/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
            >
              Вернуться к списку
            </Link>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-200 transition hover:bg-neutral-700"
            >
              Повторить загрузку
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="h-full space-y-4 px-6 py-6" data-color-mode="dark">
      <header className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-5 py-4 shadow shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Редактирование статьи
            </h1>
            <p className="mt-1 text-neutral-400">
              Все изменения автоматически сохраняются в Supabase каждые
              несколько секунд.
            </p>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-200 transition hover:bg-neutral-700"
          >
            ← К списку статей
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
          <span className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1">
            id: <code className="text-cyan-300">{draftArticle.id}</code>
          </span>

          {isUpdateArticlePending && (
            <span className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1 text-cyan-300">
              Сохраняем...
            </span>
          )}
          {updateArticleError && (
            <span className="rounded-lg border border-red-700 bg-red-900/40 px-3 py-1 text-red-300">
              Ошибка сохранения: {updateArticleError.message}
            </span>
          )}
        </div>

        {isLoadingSave && (
          <span className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1 text-cyan-300">
            Сохраняем...
          </span>
        )}
      </header>

      <MDEditor
        value={draftArticle.text}
        onChange={handleChange}
        className="h-[calc(100%-160px)]"
        data-color-mode="dark"
      />
    </div>
  )
}
