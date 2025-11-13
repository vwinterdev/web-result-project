export const computeArticleMeta = (
  content: string,
): { title: string; description: string } => {
  const lines = content.split(/\r?\n/)
  const firstLine = (lines[0] ?? '').trim()
  const descriptionLines = lines.slice(1, 6).map((line) => line.trim())
  const descriptionCandidate = descriptionLines.filter(Boolean).join(' ')

  return {
    title: firstLine,
    description: descriptionCandidate,
  }
}
