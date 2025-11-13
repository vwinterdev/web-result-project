import { useMutation, useQuery } from '@tanstack/react-query'

import { supabase } from '@/shared/superbase/superbase'
import type { ICreateArticle, IArticle } from '@/types/article'
import { Article } from '@/shared/adapters/articles'

const ARTICLES_QUERY_KEY = 'articles'

export const useListArticles = () => {
  return useQuery<IArticle[], Error>({
    queryKey: [ARTICLES_QUERY_KEY, 'list'],
    queryFn: async (): Promise<IArticle[]> => {
      const { data } = await supabase
        .from('articles')
        .select()
        .order('created_at', { ascending: false })

      return (data ?? []) as IArticle[]
    },
  })
}

export const useCreateArticle = () => {
  return useMutation<Article, Error, ICreateArticle>({
    mutationFn: async (article) => {
      const payload = {
        title: article.title,
        description: article.description,
        text: article.text,
        user_agent: article.userAgent,
      }

      const { data } = await supabase
        .from('articles')
        .insert(payload)
        .select()
        .single()

      return Article.fromRaw(data)
    },
  })
}

export const useUpdateArticle = () => {
  return useMutation<Article, Error, Article>({
    mutationFn: async (article) => {
      const payload = {
        title: article.title,
        description: article.description,
        text: article.text,
      }

      const { data, error } = await supabase
        .from('articles')
        .update(payload)
        .eq('id', article.id)
        .select()
        .single()
      if (error) throw error
      return Article.fromRaw(data)
    },
  })
}

export const useGetById = (id: string) => {
  return useQuery<Article | null, Error>({
    queryKey: [ARTICLES_QUERY_KEY, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await supabase
        .from('articles')
        .select()
        .eq('id', id)
        .single()

      return data ? Article.fromRaw(data) : null
    },
  })
}
