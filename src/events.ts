export enum EEvents {
    ALU_SUM_OUT = 'alu-sum-out',
    CLOCK_TICK_ON = 'clock-tick-on',
    CLOCK_TICK_OFF = 'clock-tick-off',
    // TODO 
    BUS_UPDATE = 'bus-update',
    REGISTER_A_CHANGE = 'register-a-change',
    REGISTER_B_CHANGE = 'register-b-change',
    PROGRAM_COUNTER_CHANGE = 'program-counter-change',
    MEMORY_ADDRESS_CHANGE = 'memory-address-change',
    RAM_CONTENT_CHANGE = 'ram-content-change'
}