export function formatDate(dateString?: string | null) {
  if (!dateString) return 'Неизвестно'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'Неизвестно'
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
