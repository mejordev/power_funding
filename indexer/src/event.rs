use ethers::abi::AbiDecode;
use ethers::providers::{Provider, Ws};
use ethers::types::{Address, BlockNumber, Filter, Log, U256};
use sqlx::PgPool;

use crate::transaction;

#[derive(Debug)]
pub struct DepositCreated {
    pub id: U256,
    pub spender: Address,
}

pub fn create_event_filter(contract_address: Address) -> Filter {
    Filter::new()
        .address(contract_address)
        .event("DepositCreated(uint256,address)")
        .from_block(BlockNumber::Number(2287947.into())) // Adjust the block as necessary
}

pub async fn process_log(
    log: Log,
    provider: &Provider<Ws>,
    pool: &PgPool,
) -> Result<(), Box<dyn std::error::Error>> {
    if let Some(decoded_event) = decode_event_log(&log) {
        println!(
            "Event detected: id: {:?}, spender: {}",
            decoded_event.id, decoded_event.spender
        );

        // if let Some(tx_hash) = log.transaction_hash {
        //     transaction::handle_transaction(tx_hash, provider, pool, chain_id, decoded_event)
        //         .await?;

        if let Some(tx_hash) = log.transaction_hash {
            transaction::handle_transaction(tx_hash, provider, pool, decoded_event).await?;
        } else {
            println!("No transaction hash found in the log.");
        }
    } else {
        println!("Failed to decode event log.");
    }
    Ok(())
}

// Decode the DepositCreated event log to extract parameters
fn decode_event_log(log: &Log) -> Option<DepositCreated> {
    // Ensure the log has at least two topics: one for the event signature, and one for the indexed id
    if log.topics.len() != 2 {
        println!(
            "Unexpected number of topics in the log: {}",
            log.topics.len()
        );
        return None;
    }

    // Decode the id from the second topic
    let id: U256 = U256::from(log.topics[1].as_bytes());

    // Decode the spender from the data field
    let data = log.data.as_ref();
    let decoded_values = match <(Address,)>::decode(data) {
        Ok(values) => values,
        Err(e) => {
            println!("Failed to decode event data: {:?}", e);
            return None;
        }
    };

    Some(DepositCreated {
        id,
        spender: decoded_values.0,
    })
}
