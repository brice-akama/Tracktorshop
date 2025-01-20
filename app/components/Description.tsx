// components/Description.tsx

const Description = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        {/* Updated Heading with Responsive Text */}
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
          Welcome to PowerPlow
        </h2>
        
        {/* Updated Paragraph with One-Line Description */}
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
  PowerPlow provides durable, reliable, and affordable tractor parts to ensure your equipment runs at its peak performance. Shop with us today!
</p>

      </div>
    </div>
  );
};

export default Description;

