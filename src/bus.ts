let value = 0

export const useBus = () => {
    
    const setValue = (payload: number) => {
        value = payload
    }

    return {
        setValue,
        value: () => value
    }
}