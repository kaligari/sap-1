export const useRegister = () => {
    let valueArray = new Uint8Array(1)
    let dataView = new DataView(valueArray.buffer)

    const getValue = () => {
        return dataView.getUint8(0)
    }

    const setValue = (value: number) => {
        dataView.setUint8(0, value)
    }

    return {
        getValue,
        setValue
    }
}