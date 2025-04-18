
const WoodenLogo = () => {
  return (
    <div className="w-10 h-10 relative flex items-center justify-center rounded-md overflow-hidden wood-texture">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-wood-light to-wood-dark"></div>
      <div className="text-wood-dark dark:text-wood-light font-bold text-xl">BS</div>
    </div>
  );
};

export default WoodenLogo;
