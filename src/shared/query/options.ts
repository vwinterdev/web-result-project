import type { DefaultOptions } from '@tanstack/react-query'

export const queryClientDefaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    retry: 2,
  },
  mutations: {
    retry: 1,
  },
}
