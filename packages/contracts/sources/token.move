module admin::my_token {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::coin_registry::{Self as coin_registry};

    /// The type identifier of the token
    public struct MY_TOKEN has drop {}


    /// Module initializer to be executed when this module is published
    fun init(witness: MY_TOKEN, ctx: &mut TxContext) {
        // Create currency using CoinRegistry OTW flow (flexible supply, unregulated)
    let (builder, treasury) = coin_registry::new_currency_with_otw<MY_TOKEN>(
            witness,
            9, // decimals
            b"MYTTTT".to_string(), // symbol
            b"My Tokensss".to_string(), // name
            b"An example token on SUI blockchain".to_string(), // description
            b"https://example.com/token-iconn.png".to_string(), // icon url
            ctx
        );

        // Finalize to obtain MetadataCap; we transfer both caps to publisher (ctx.sender())
        let metadata_cap = builder.finalize(ctx);
        transfer::public_transfer(treasury, ctx.sender());
        transfer::public_transfer(metadata_cap, ctx.sender());
    }

    /// Mint new tokens (only treasury cap holder can mint)
    public fun minttt(
        treasury_cap: &mut TreasuryCap<MY_TOKEN>, 
        amount: u64, 
        recipient: address, 
        ctx: &mut TxContext
    ) {
        let coin = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, recipient);
    }

    /// Burn tokens to reduce supply
    public fun burn(
        treasury_cap: &mut TreasuryCap<MY_TOKEN>, 
        coin: Coin<MY_TOKEN>
    ) {
        coin::burn(treasury_cap, coin);
    }


    /// Split a coin into two coins
    public fun split(
        coin: &mut Coin<MY_TOKEN>,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<MY_TOKEN> {
        coin::split(coin, amount, ctx)
    }

    /// Merge two coins into one
    public fun join(
        coin: &mut Coin<MY_TOKEN>,
        coin_to_merge: Coin<MY_TOKEN>
    ) {
        coin::join(coin, coin_to_merge);
    }

    /// Get the total supply minted so far
    public fun total_supply(treasury_cap: &TreasuryCap<MY_TOKEN>): u64 {
        coin::total_supply(treasury_cap)
    }

    #[test_only]
    /// Test helper returning a TreasuryCap for direct mutation in tests (keeps cap local) and
    /// transfers MetadataCap to sender.
    public fun test_init(ctx: &mut TxContext): TreasuryCap<MY_TOKEN> {
    let (builder, treasury) = coin_registry::new_currency_with_otw<MY_TOKEN>(
            MY_TOKEN {},
            9,
            b"MYTTT".to_string(),
            b"My Tokensss".to_string(),
            b"An example token on SUI blockchainn".to_string(),
            b"https://example.com/token-iconnn.png".to_string(),
            ctx
        );
        let metadata_cap = builder.finalize(ctx);
        // Provide metadata cap to the sender (mirrors production init transfer semantics)
        transfer::public_transfer(metadata_cap, ctx.sender());
        treasury
    }

    #[test_only]
    /// Test helper to mint and return a Coin without transferring it to another address.
    public fun test_mint_return(
        treasury_cap: &mut TreasuryCap<MY_TOKEN>,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<MY_TOKEN> {
        coin::mint(treasury_cap, amount, ctx)
    }
}