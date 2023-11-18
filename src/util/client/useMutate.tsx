import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface UseMutateOptions {
  loading: JSX.Element | string
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
    onSuccess: () => {
      if (options.onSuccess?.toast) {
        toast.success(options.onSuccess.toast, {
          position: "bottom-center",
        })
      }
    },
    onError: () => {
      if (options.onError?.toast) {
        toast.error(options.onError.toast, {
          position: "bottom-center",
        })
      }
    },
  })
  return {
    mutate: mutateAsync,
    isLoading: isPending,
    isError,
    error,
    isSuccess,
    loading: options.loading,
  }
}