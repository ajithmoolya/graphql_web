import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
} from '../../services/graphql/__generated__/operations'
import { GET_CATEGORY } from '../../services/graphql/query/GetCategory'
import { useMutation } from '@apollo/client'
import UpdateCategoryDoc from '../../services/graphql/mutation/UpdateCategory'
import DeleteCategoryDoc from '../../services/graphql/mutation/DeleteCategory'

/**
 * useCategories
 * Provides category list, create mutation, and refetch.
 *
 * Usage:
 *   const { categories, loading, error, createCategory, creating } = useCategories()
 */
export function useCategories() {
  const { data, loading, error, refetch } = useGetCategoryQuery()

  const [createCategory, { loading: creating }] = useCreateCategoryMutation({
    refetchQueries: [{ query: GET_CATEGORY }],
    awaitRefetchQueries: true,
  })

  const [runUpdateCategory, { loading: updating }] = useMutation(UpdateCategoryDoc, {
    refetchQueries: [{ query: GET_CATEGORY }],
    awaitRefetchQueries: true,
  })

  const [runDeleteCategory, { loading: deleting }] = useMutation(DeleteCategoryDoc, {
    refetchQueries: [{ query: GET_CATEGORY }],
    awaitRefetchQueries: true,
  })

  const categories = data?.GetCategory ?? []

  return {
    categories,
    loading,
    error,
    refetch,
    createCategory,
    creating,
    updateCategory: runUpdateCategory,
    updating,
    deleteCategory: runDeleteCategory,
    deleting,
  }
}
