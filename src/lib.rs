use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

use std::convert::TryInto;

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let (key,rem) = instruction_data.split_first().unwrap();
    match key {
        0 => {
            let value:u64 = rem
            .get(0..10)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .unwrap_or(0);
            msg!("zero {}", value)},
        1 => msg!("one"),
        _ => msg!("Error, uckk : {:?}", instruction_data),
    };
    msg!("process_instruction: {} : {} accounts, data = {:?}", program_id, accounts.len(), instruction_data);
    Ok(())
}