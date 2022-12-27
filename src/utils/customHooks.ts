import { useEffect, useRef } from "react"

// Custom hook for returning previous value
function usePrevious(value: any): typeof value {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    },[value]);
    return ref.current;
}

export { usePrevious }