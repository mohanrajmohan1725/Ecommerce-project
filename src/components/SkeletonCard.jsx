function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow animate-pulse">
      <div className="h-40 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 w-1/2"></div>
    </div>
  );
}

export default SkeletonCard;