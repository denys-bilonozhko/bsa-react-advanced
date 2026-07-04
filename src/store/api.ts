const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://bsa-react-advanced-api.eu-central-1.elasticbeanstalk.com'

export const TOKEN_KEY = 'token'

export type ApiError = {
  message: string
  status: number
}

type RequestOptions = RequestInit & {
  authenticated?: boolean
}

export async function apiRequest<T>(
  path: string,
  { authenticated = true, headers, ...options }: RequestOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers)
  const token = localStorage.getItem(TOKEN_KEY)

  if (options.body) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  if (authenticated && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: requestHeaders,
  })
  const text = await response.text()
  let data: unknown

  try {
    data = text ? (JSON.parse(text) as unknown) : undefined
  } catch {
    data = undefined
  }

  if (!response.ok) {
    const errorData = data as
      | { message?: string; error?: { message?: string } }
      | undefined

    throw {
      status: response.status,
      message:
        errorData?.message ??
        errorData?.error?.message ??
        response.statusText ??
        'Something went wrong',
    } satisfies ApiError
  }

  return data as T
}

export function toApiError(error: unknown): ApiError {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  ) {
    return error as ApiError
  }

  return {
    status: 0,
    message: error instanceof Error ? error.message : 'Something went wrong',
  }
}
