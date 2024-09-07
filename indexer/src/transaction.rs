use ethers::abi::AbiDecode;
use ethers::contract::abigen;
use ethers::providers::{Middleware, Provider, Ws};
use ethers::types::{Bytes, H256};
use sqlx::PgPool;

use crate::db;
use crate::event::DepositCreated;

abigen!(
    MyContract,
    r#"[
        function createDeposit(uint64 nonce, address spender, uint128 amount, uint128 flatFeeAmount, uint64 validToTimestamp) public returns (uint256)
    ]"#
);

// Use the generated contract bindings to decode transaction data
pub async fn handle_transaction(
    tx_hash: H256,
    provider: &Provider<Ws>,
    pool: &PgPool,
    decoded_event: DepositCreated,
) -> Result<(), Box<dyn std::error::Error>> {
    // Fetch the transaction details
    if let Some(transaction) = provider.get_transaction(tx_hash).await? {
        println!("Transaction: {:?}", transaction);

        // Ensure the contract address is present (i.e., `to` field is Some)
        if let Some(contract_address) = transaction.to {
            // Instantiate the contract using its address
            let contract = MyContract::new(contract_address, provider.clone().into());

            // Decode the input data
            if let Ok(decoded_input) = decode_transaction_input(&transaction.input) {
                println!(
                    "Decoded: nonce: {:?}, spender: {:?}, amount: {:?}, flat_fee_amount: {:?}, valid_to_timestamp: {:?}, sender: {:?}", 
                    decoded_input.nonce, decoded_input.spender, decoded_input.amount, decoded_input.flat_fee_amount, decoded_input.valid_to_timestamp, transaction.from
                );

                if let Err(e) =
                    db::save_donation(&pool, &transaction, &decoded_event, &decoded_input).await
                {
                    eprintln!("Error saving donation: {:?}", e);
                }
            } else {
                println!("Failed to decode transaction input.");
            }
        } else {
            println!("No contract address found in the transaction.");
        }
    } else {
        println!("Transaction not found.");
    }

    Ok(())
}

// Struct to hold decoded transaction input values
#[derive(Debug)]
pub struct CreateDepositInput {
    pub nonce: u64,
    pub spender: ethers::types::Address,
    pub amount: ethers::types::U256,
    pub flat_fee_amount: ethers::types::U256,
    pub valid_to_timestamp: u64,
}

// Decode the transaction input manually using the ABI decoding utilities
pub fn decode_transaction_input(
    input: &Bytes,
) -> Result<CreateDepositInput, Box<dyn std::error::Error>> {
    // Skip the first 4 bytes (the function selector)
    let decoded = <(
        u64,
        ethers::types::Address,
        ethers::types::U256,
        ethers::types::U256,
        u64,
    )>::decode(&input[4..])?;

    Ok(CreateDepositInput {
        nonce: decoded.0,
        spender: decoded.1,
        amount: decoded.2,
        flat_fee_amount: decoded.3,
        valid_to_timestamp: decoded.4,
    })
}
