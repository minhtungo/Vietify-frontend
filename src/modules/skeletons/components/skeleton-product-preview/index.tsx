const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[5/7] w-full bg-gray-100 rounded-2xl"></div>
      <div className="text-base-regular mt-2">
        <div className="w-3/5 h-5 bg-gray-100"></div>

        <div className="w-1/2 h-4 bg-gray-100 mt-2"></div>
        <div className="w-2/6 h-3 bg-gray-100 mt-2"></div>
        <div className="w-3/6 h-5 bg-gray-100 mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
