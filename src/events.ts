export enum EEvents {
    CLOCK_TICK_ON = 'clock-tick-on',
    CLOCK_TICK_OFF = 'clock-tick-off',
    
    ALU_SUM_OUT_TO_BUS = 'alu-sum-out',
    PROGRAM_COUNTER_TO_BUS = 'program-counter-to-bus',
    REGISTER_A_TO_BUS = 'register-a-to-bus',
    INSTRUCTION_REGISTER_TO_BUS = 'instruction-register-to-bus',
    RAM_CONTENT_TO_BUS = 'ram-content-to-bus',
    REGISTER_A_CHANGE = 'register-a-change',
    REGISTER_B_CHANGE = 'register-b-change',
    MEMORY_ADDRESS_CHANGE = 'memory-address-change',
    RAM_CONTENT_CHANGE = 'ram-content-change',
    INSTRUCTION_REGISTER_CHANGE = 'instruction-register-change'
}