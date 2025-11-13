import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useCreateArticle } from '@/service/articles'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const createArticle = useCreateArticle()

  const handleCreateArticle = async () => {
    if (createArticle.isPending) return

    const created = await createArticle.mutateAsync({
      title: '',
      description: '',
      text: '',
      userAgent: navigator.userAgent,
    })

    if (created) {
      router.navigate({
        to: '/e/articles/$articleId',
        params: { articleId: created.id },
      })
    }
  }

  return (
    <div className="h-full overflow-auto px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <section className="rounded-2xl border border-neutral-800 bg-neutral-950/70 px-8 py-10 shadow shadow-black/40">
          <h1 className="text-4xl font-semibold text-white">
            Выпускной проект Акулинина Владислава Сергеевича
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Программа профессиональной переподготовки «Веб-разработчик», 256
            академических часов.
          </p>
          <p className="mt-3 text-neutral-300">
            Проект демонстрирует освоение инструментов веб-разработки и
            охватывает полный цикл создания интерактивного веб-приложения: от
            проектирования интерфейсов и инфраструктуры хранения данных до
            публикации и сопровождения контента.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-300">
            <button
              type="button"
              onClick={handleCreateArticle}
              disabled={createArticle.isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-600/50 bg-cyan-500/20 px-5 py-3 text-base font-medium text-cyan-200 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createArticle.isPending
                ? 'Создаём статью...'
                : 'Написать новую статью'}
            </button>
            {createArticle.isError && (
              <span className="rounded-lg border border-red-700 bg-red-900/40 px-3 py-2 text-sm text-red-300">
                {createArticle.error?.message}
              </span>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-950/60 px-8 py-10 shadow-lg shadow-black/30">
          <h2 className="text-2xl font-semibold text-white">
            Описание программы
          </h2>
          <p className="mt-4 text-neutral-300">
            Цель профессиональной переподготовки — подготовка
            высококвалифицированных специалистов для выполнения нового вида
            профессиональной деятельности в области веб-разработки с акцентом на
            результативное продвижение и реализацию товаров и услуг в сети
            Интернет и социальных медиа.
          </p>
          <p className="mt-3 text-neutral-400">
            В учебном курсе рассматриваются алгоритмы и программное обеспечение,
            применяемые при создании веб-сайтов, онлайн-платформ и
            мультимедийных приложений. Отдельное внимание уделено инструментам
            веб-программирования, интернет-коммуникациям, процессам
            сопровождения информационных ресурсов и современным инструментальным
            средствам работы с исходным кодом.
          </p>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-950/60 px-8 py-10 shadow-lg shadow-black/30">
          <h2 className="text-2xl font-semibold text-white">Стек приложения</h2>
          <p className="mt-4 text-neutral-300">
            Проект реализован на современном технологическом стеке,
            обеспечивающем производительность, гибкость и удобство разработки:
          </p>
          <ul className="mt-4 grid gap-2 text-neutral-300 md:grid-cols-2">
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              React 19 + TypeScript 5 для декларативного UI и статической
              типизации
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Vite 7 для сборки и разработки с горячей перезагрузкой
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Tailwind CSS 4 и кастомная дизайн-система для стилизации
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              TanStack Router и TanStack Query для маршрутизации и работы с
              данными
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Supabase как облачная платформа хранения и синхронизации контента
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              @uiw/react-md-editor для редактирования и предпросмотра Markdown
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Vitest и Testing Library для модульного и интеграционного
              тестирования
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              ESLint и Prettier для обеспечения качества и единого стиля кода
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-950/60 px-8 py-10 shadow-lg shadow-black/30">
          <h2 className="text-2xl font-semibold text-white">
            Цель и задачи приложения
          </h2>
          <p className="mt-4 text-neutral-300">
            Цель проекта — предоставить авторам удобную платформу для создания,
            редактирования и публикации статей с автоматизацией рутинных
            процессов.
          </p>
          <ul className="mt-4 grid gap-2 text-neutral-300">
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Реализовать оперативное создание черновиков и их хранение в
              Supabase
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Обеспечить автосохранение и синхронизацию изменений в реальном
              времени
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Предоставить Markdown-редактор с живым предпросмотром и поддержкой
              медиа
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Организовать удобную навигацию по статьям и управление
              публикациями
            </li>
            <li className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              Создать основу для интеграции аналитики и инструментов продвижения
              контента
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
