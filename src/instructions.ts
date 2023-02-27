export const HT = 0b1000000000000000
export const MI = 0b0100000000000000
export const RI = 0b0010000000000000
export const RO = 0b0001000000000000
export const IO = 0b0000100000000000
export const II = 0b0000010000000000
export const AI = 0b0000001000000000
export const AO = 0b0000000100000000

export const EO = 0b0000000010000000
export const SU = 0b0000000001000000
export const BI = 0b0000000000100000
export const OI = 0b0000000000010000
export const CE = 0b0000000000001000
export const CO = 0b0000000000000100
export const  J = 0b0000000000000010
export const IR = 0b0000000000000001

const LDA = 0x1
const SUM = 0x2
const OUT = 0xE
const HLT = 0xF

export type TInstruction = { [key: number]: number[]; }

export const instructions: TInstruction = {
    [LDA]: [ IO | MI, RO | AI, IR ],
    [SUM]: [ IO | MI, RO | BI, EO | AI, IR ],
    [OUT]: [ IO | MI, AO | OI, IR ],
    [HLT]: [ HT ]
}
export type TProgramInstruction = [number, number?] | number
export type TProgram = TProgramInstruction[]
export const program: TProgram = [
    [LDA, 14],
    [SUM, 15],
    [OUT, 0],
    [HLT, 0],
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    28,
    14,
]

export const programLineToNumber = (programLine: TProgramInstruction) => {
    let instruction
    let operand
    if(Array.isArray(programLine)) {
        instruction = (programLine as number[])[0] << 4
        operand = (programLine as number[])[1] || 0
    } else {
        instruction = 0
        operand = programLine as number
    }
    return instruction | operand
}

export const programInMachineCode = program.forEach(item => programLineToNumber(item))

const programInMemory = program.reduce((prev, byte, idx) => {
    return prev.concat(`${idx.toHexFormat(1)}: ${programLineToNumber(byte).toHexFormat()}\n`)
}, '')

console.log(`program in memory:\n\n${programInMemory}`);
