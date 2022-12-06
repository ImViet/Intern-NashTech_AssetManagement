import { useRef } from 'react'

function useThrottle(action, throttle) {
    const throttleTimer : any = useRef();

    const handleAction = (...param) => {
        if (throttleTimer.current) {
            clearTimeout(throttleTimer.current);
        }
        throttleTimer.current = setTimeout(() => {
            action( ...param )
        }, throttle);
    };

    return handleAction
}

export default useThrottle