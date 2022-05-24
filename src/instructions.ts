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

// export const instructions: { [key: string]: number; } = {
//     '00000000': MI | CO,
//     '00000001': RO | II | CE,

//     '00010000': MI | CO,
//     '00010001': RO | II | CE,
//     '00010010': IO | MI,
//     '00010011': RO | AI,

//     '00100000': MI | CO,
//     '00100001': RO | II | CE,
//     '00100010': IO | MI,
//     '00100011': RO | BI,
//     '00100100': EO | AI,

//     '11100000': MI | CO,
//     '11100001': RO | II | CE,
//     '11100010': AO | OI,

//     '11110000': MI | CO,
//     '11110001': RO | II | CE,
//     '11110010': HT,
    
// }

const LDA: number[] = [
    IO | MI,
    RO | AI,
    IR
]
const SUM: number[] = [
    IO | MI,
    RO | BI,
    EO | AI,
    IR
]
const OUT: number[] = [
    IO | MI,
    AO | OI,
    IR
]
const HLT: number[] = [ HT ]

export type TInstruction = { [key: number]: number[]; }

export const instructions: TInstruction = {
    0x1: LDA,
    0x2: SUM,
    0xE: OUT,
    0xF: HLT
}
