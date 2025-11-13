import type { Raw } from '@/types/raw'
import { formatDate } from '../utils/formatDate'

export class Article {
  id: string
  title: string
  description: string
  text: string
  isPublish: boolean
  userAgent: string
  createdAt: string

  constructor(data: Raw) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.text = data.text
    this.isPublish = data.is_publish
    this.userAgent = data.user_agent
    this.createdAt = formatDate(data.created_at ?? null)
  }

  static fromRaw(data: Raw): Article {
    return new Article(data)
  }
}
