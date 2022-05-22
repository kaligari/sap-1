export const useRegister = (size = 1) => {
    let valueArray = new Uint8Array(size)
    let dataView = new DataView(valueArray.buffer)

    const getValue = (address = 0) => {
        return dataView.getUint8(address)
    }

    const setValue = (value: number, address = 0) => {
        dataView.setUint8(address, value)
    }

    return {
        getValue,
        setValue
    }
}