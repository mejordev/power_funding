use ethers::types::Transaction;
use serde_json::Value;
use sqlx::PgPool;

use crate::{event::DepositCreated, transaction::CreateDepositInput};

pub async fn save_donation(
    pool: &PgPool,
    transaction: &Transaction,
    decoded_event: &DepositCreated,
    decoded_input: &CreateDepositInput,
) -> Result<(), ()> {
    let transaction_hash = format!("{:?}", transaction.hash);
    let project_address = format!("{:?}", decoded_event.spender); // Mapped to spender in your table
    let amount = decoded_input.amount.to_string(); // Mapped to the amount field
    let flat_fee_amount = decoded_input.flat_fee_amount.to_string(); // Mapped to flat_fee_amount
    let valid_to_timestamp = decoded_input.valid_to_timestamp as i64; // Mapped to valid_to_timestamp
    let sender_address = format!("{:?}", transaction.from); // Mapped to sender_address
    let nonce = decoded_input.nonce as i64; // Mapped to nonce
    let id = format!("{:?}", decoded_event.id); // Mapped to id

    // Print values before inserting (for debugging purposes)
    // println!("Transaction Hash: {}", transaction_hash);
    // println!("Project Address: {}", project_address);
    // println!("Amount: {}", amount);
    // println!("Flat Fee Amount: {}", flat_fee_amount);
    // println!("Valid To Timestamp: {}", valid_to_timestamp);
    // println!("Sender Address: {}", sender_address);
    // println!("Nonce: {}", nonce);
    // println!("ID: {}", id);

    // Try inserting the donation record into the database
    if let Err(e) = sqlx::query(
        "INSERT INTO donation (
            transaction_hash, project_address, added_at, edited_at, amount, flat_fee_amount, 
            valid_to_timestamp, sender_address, nonce, id
        )
        VALUES ($1, $2, now(), now(), $3, $4, $5, $6, $7, $8)",
    )
    .bind(transaction_hash) // $1: transaction_hash
    .bind(project_address) // $2: project_address (spender)
    .bind(amount) // $3: amount
    .bind(flat_fee_amount) // $4: flat_fee_amount
    .bind(valid_to_timestamp) // $5: valid_to_timestamp
    .bind(sender_address) // $6: sender_address
    .bind(nonce) // $8: nonce
    .bind(id) // $9: id
    .execute(pool)
    .await
    {
        // Log the error and continue execution
        eprintln!("Error inserting donation record: {:?}", e);
    }

    Ok(()) // Continue execution even if an error occurs
}
