const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-surface-100 p-5 animate-pulse"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-surface-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-200 rounded-lg w-2/3" />
              <div className="h-3 bg-surface-100 rounded-lg w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-surface-100 rounded-lg w-full" />
            <div className="h-3 bg-surface-100 rounded-lg w-3/4" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-6 bg-surface-100 rounded-full w-16" />
            <div className="h-6 bg-surface-100 rounded-full w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
