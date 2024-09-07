mod config;
mod db;
mod event;
mod transaction;

use ethers::providers::Middleware;
use futures::StreamExt;
use sqlx::PgPool;
// use sqlx::PgPool;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize environment variables and dependencies
    let (database_url, ws_url) = config::load_env_variables()?;
    let provider = config::initialize_provider(ws_url).await?;
    let pool = PgPool::connect(&database_url).await?;
    println!("Connected to the database");

    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Cannot connect to db");
    let contract_address = "0x63704675f72A47a7a183112700Cb48d4B0A94332".parse()?;
    let filter = event::create_event_filter(contract_address);

    let mut stream = provider.subscribe_logs(&filter).await?;
    while let Some(log) = stream.next().await {
        event::process_log(log, &provider, &pool).await?;
    }
    Ok(())
}
