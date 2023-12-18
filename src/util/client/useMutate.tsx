import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface UseMutateOptions {
  loading: Partial<{
    toast: JSX.Element | string
    button: JSX.Element | string
  }>
  onSuccess: { toast: JSX.Element | string }
  onError: { toast: JSX.Element | string }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMutate = <F extends ((...args: any[]) => Promise<any>)>(
  handler: F,
  options: Partial<UseMutateOptions> = {},
) => {
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: handler,
  })
  const handleMutate = async (...args: Parameters<typeof mutateAsync>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await toast.promise(
      mutateAsync(...args),
      {
        loading: options.loading?.toast ?? null,
        success: options.onSuccess?.toast ?? null,
        error: options.onError?.toast ?? null,
      },
    )
  }
  return {
    mutate: handleMutate,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
    loading: options.loading,
  }
}