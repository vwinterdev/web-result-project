import { QueryClient } from '@tanstack/react-query'

import { queryClientDefaultOptions } from './options'

export const queryClient = new QueryClient({
  defaultOptions: queryClientDefaultOptions,
})
