export default async () => {
  return (
    <div className="w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-6">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-[rgb(241,246,175)] h-[150px] w-[350px] rounded-xl p-6 shadow-md border border-gray-100 animate-pulse"
            />
          ))}
      </div>
    </div>
  );
};
