import { useMutation } from "@tanstack/react-query"

interface UseMutateOptions {
  onSuccess: { toast: JSX.Element | string }
  onError: { toast: JSX.Element | string }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMutate = <F extends ((...args: any[]) => Promise<any>)>(
  handler: F,
  options: Partial<UseMutateOptions> = {},
) => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    ...options,
    mutationFn: handler,
    onSuccess: () => { /* TODO トーストの表示 */ },
    onError: () => { /* TODO トーストの表示 */ },
  })
  return {
    mutate: mutateAsync,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
  }
}