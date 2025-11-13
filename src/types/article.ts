export interface ICreateArticle {
  title: string
  description: string
  text: string
  userAgent: string
}

export interface IArticle extends ICreateArticle {
  id: string
  created_at: string
}
