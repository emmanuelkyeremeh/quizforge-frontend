const Logo = ({ className = '', size = 'default' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black background circle */}
      <circle cx="20" cy="20" r="18" fill="#000000" />
      
      {/* White Q letter - main circular shape */}
      <path
        d="M20 12 C 14.5 12, 10 16.5, 10 22 C 10 27.5, 14.5 32, 20 32 C 22.5 32, 24.8 31, 26.5 29.5 L30 33"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Inner cutout to create the Q opening */}
      <path
        d="M20 16 C 17 16, 14.5 18.5, 14.5 22"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Logo;

