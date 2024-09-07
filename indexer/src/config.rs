use ethers::providers::{Provider, Ws};
use std::env;

pub fn load_env_variables() -> Result<(String, String), Box<dyn std::error::Error>> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env");
    let ws_url = env::var("WS_URL").unwrap_or_else(|_| "ws://127.0.0.1:8545".to_string());

    Ok((database_url, ws_url))
}

pub async fn initialize_provider(
    ws_url: String,
) -> Result<Provider<Ws>, Box<dyn std::error::Error>> {
    let ws = Ws::connect(ws_url).await?;
    Ok(Provider::new(ws))
}
