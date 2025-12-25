import { useEffect, useState } from 'react';

export default function ProgressBar({ progress = 0, animated = true }) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      // Smoothly animate to the target progress
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  return (
    <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 ease-out"
        style={{ width: `${displayProgress}%` }}
      />
    </div>
  );
}

