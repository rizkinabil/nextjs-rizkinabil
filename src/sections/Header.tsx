export const Header = () => {
  return (
    // TODO: why it need to use left-1/2 -transate-x-1/2 harusnya tetep bisa kalo gapake
    <div className="flex justify-center items-center fixed top-3 left-1/2 -translate-x-1/2 z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#" className="nav-item">
          Home
        </a>
        <a href="#" className="nav-item">
          Project
        </a>
        <a href="#" className="nav-item">
          About
        </a>
        <a href="#" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">
          Contact
        </a>
      </nav>
    </div>
  );
};
