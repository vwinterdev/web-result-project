interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'postgres' {
  interface PostgresOptions {
    ssl?: 'require' | boolean | Record<string, unknown>
  }

  interface PostgresClient {
    unsafe<T = unknown>(query: string, params?: unknown[]): Promise<T>
    end(config?: { timeout?: number }): Promise<void>
  }

  interface PostgresFn {
    (connectionString?: string, options?: PostgresOptions): PostgresClient
  }

  const postgres: PostgresFn

  export default postgres
}
