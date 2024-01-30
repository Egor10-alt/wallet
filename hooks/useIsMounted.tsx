import { useEffect, useState } from 'react';

export const useIsMounted = () => {
    const [isMounted, setIsMouned] = useState(false);

    useEffect(() => {
        setIsMouned(true);
    }, []);

    return isMounted;
}
  