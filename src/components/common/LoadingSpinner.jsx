export default function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  const spinner = (
    <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 ${sizeMap[size]}`} />
  )
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    )
  }
  return <div className="flex justify-center items-center py-8">{spinner}</div>
}
