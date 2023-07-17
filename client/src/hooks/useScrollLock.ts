import React from 'react';

const useScrollLock = (lock: boolean) => {
  React.useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [lock]);
};

export default useScrollLock;
