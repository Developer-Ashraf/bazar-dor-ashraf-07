export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner Skeleton */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded-full mb-4" />
        <div className="h-10 w-3/4 max-w-md bg-gray-200 rounded-2xl mb-4" />
        <div className="h-4 w-full max-w-lg bg-gray-100 rounded-lg mb-2" />
        <div className="h-4 w-2/3 max-w-md bg-gray-100 rounded-lg mb-6" />
        <div className="h-12 w-36 bg-gray-200 rounded-2xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-44 bg-gray-200 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded-md" />
                </div>
              </div>
              <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded-md" />
                <div className="h-5 w-16 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
