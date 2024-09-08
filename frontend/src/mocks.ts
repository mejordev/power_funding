import { Project } from "./types";

export const projects: Project[] = [
  {
    address: "0xA1234567890bCDEF1234567890bCDEF123456789",
    name: "DeFi Farmer",
    description:
      "DeFi Farmer is a decentralized yield farming protocol that empowers users to maximize their returns by providing liquidity to various decentralized finance pools. The platform automatically seeks out the highest-yielding farms, adjusts liquidity as needed, and compounds profits to achieve optimal returns for LP token holders. With an intuitive user interface, detailed performance metrics, and low transaction fees, DeFi Farmer offers a seamless experience for both novice and experienced DeFi participants looking to grow their assets in the crypto ecosystem.",
    goal: BigInt(100000),
    avatar_url:
      "https://assets.clarisco.com/clarisco+images/defi/deFi-yield-farming-development/defi-yield-farming-development-company.webp",
    website_url: "https://defifarmer.io",
    valid_to_timestamp: BigInt(
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
    ),
    created_at: new Date(),
    edited_at: new Date(),
    percentage: 72,
  },
  {
    address: "0xB9876543210cDEF09876543210cDEF0987654321",
    name: "Token Trader",
    description:
      "Token Trader is an advanced, AI-powered automated trading bot designed for the fast-paced world of cryptocurrency markets. It integrates with multiple exchanges, continually monitoring price movements and market signals to make informed trading decisions. Using sophisticated machine learning algorithms, the bot identifies trends and executes trades with lightning speed, maximizing profits and minimizing risk. Whether you're looking to capitalize on short-term market fluctuations or maintain a long-term trading strategy, Token Trader is a reliable solution for hands-off crypto trading, providing comprehensive analytics and 24/7 monitoring.",
    goal: BigInt(250000),
    avatar_url:
      "https://www.shutterstock.com/image-vector/bitcoin-abstract-golden-symbol-internet-600nw-744604423.jpg",
    website_url: "https://tokentrader.ai",
    valid_to_timestamp: BigInt(
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60
    ),
    created_at: new Date(),
    edited_at: new Date(),
    percentage: 85,
  },
  {
    address: "0xC4567890AbCdEf1234567890AbCdEf1234567890",
    name: "SoFi Monitor",
    description:
      "SoFi Monitor is a cutting-edge real-time monitoring and analytics platform tailored specifically for social finance projects. It provides users with in-depth insights into project performance, token dynamics, and community sentiment, empowering investors and stakeholders to make data-driven decisions. Featuring customizable alerts, social media integration, and historical trend analysis, SoFi Monitor enables users to track market movements and identify emerging opportunities in the SoFi ecosystem. Whether you're tracking a portfolio of social tokens or keeping an eye on new projects, SoFi Monitor is your go-to tool for staying ahead of the market.",
    goal: BigInt(50000),
    avatar_url:
      "https://www.hollywoodreporter.com/wp-content/uploads/2023/10/SoFi-Stadium-Bowl-Northwest-H-2023JPG.jpg?w=1296",
    website_url: "https://sofimonitor.com",
    valid_to_timestamp: BigInt(
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 45
    ),
    created_at: new Date(),
    edited_at: new Date(),
    percentage: 63,
  },
  {
    address: "0xD2345678901bCDEF12345678901bCDEF12345678",
    name: "NFT Marketplace",
    description:
      "NFT Marketplace is a decentralized platform that offers creators, artists, and collectors a seamless experience for minting, buying, and selling non-fungible tokens (NFTs). Designed with low transaction fees and scalability in mind, the platform provides a secure environment for users to trade digital assets, ranging from artwork and music to virtual real estate and gaming collectibles. NFT Marketplace features a user-friendly interface, advanced filtering options, and multi-chain support, allowing users to easily discover and participate in the vibrant NFT ecosystem. The platform's unique staking mechanisms also enable users to earn rewards while holding their NFTs.",
    goal: BigInt(150000),
    avatar_url:
      "https://img.freepik.com/free-vector/nft-non-fungible-token-concept-with-neon-light-effect_1017-41102.jpg",
    website_url: "https://nftmarket.io",
    valid_to_timestamp: BigInt(
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 90
    ),
    created_at: new Date(),
    edited_at: new Date(),
    percentage: 95,
  },
  {
    address: "0xE0987654321BcDeF0987654321BcDeF098765432",
    name: "Crypto Wallet",
    description:
      "Crypto Wallet is a highly secure, multi-chain wallet designed for users to easily manage, store, and stake their cryptocurrencies. Offering support for a wide variety of tokens across multiple blockchain networks, the wallet provides seamless integration with decentralized applications (dApps) and staking platforms. With its advanced encryption technologies and user-friendly interface, Crypto Wallet is built to cater to both beginners and advanced users alike. Users can track their portfolio, send and receive tokens, and participate in staking pools, all within a single application, ensuring they maintain full control of their assets at all times.",
    goal: BigInt(200000),
    avatar_url:
      "https://img.freepik.com/premium-vector/crypto-wallet_8251-32.jpg",
    website_url: "https://cryptowallet.io",
    valid_to_timestamp: BigInt(
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 120
    ),
    created_at: new Date(),
    edited_at: new Date(),
    percentage: 44,
  },
];
