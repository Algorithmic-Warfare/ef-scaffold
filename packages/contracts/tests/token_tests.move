module TokenBoilerplate::token_tests {
    use sui::test_scenario::Self as ts;
    use admin::my_token::{Self, MY_TOKEN};
    use sui::coin::{Coin, TreasuryCap};

    const ADMIN: address = @0x0;

    // Basic initialization flow (simulate original init: create then transfer cap to publisher)
    #[test]
    fun test_init_original_flow() {
        let mut sc = ts::begin(ADMIN);
        let ctx = sc.ctx();
        let treasury = my_token::test_init(ctx);
        transfer::public_transfer(treasury, ADMIN);
        sc.end();
    }

    // Full lifecycle: init -> mint -> split -> join -> burn, while checking total supply invariants.
    #[test]
    fun test_full_lifecycle() {
        let mut sc = ts::begin(ADMIN);
        let ctx = sc.ctx();
        let mut treasury: TreasuryCap<MY_TOKEN> = my_token::test_init(ctx);
        assert!(my_token::total_supply(&treasury) == 0);

        // Mint 1_000 units and operate on the coin
        let mut coin: Coin<MY_TOKEN> = my_token::test_mint_return(&mut treasury, 1_000, ctx);
        assert!(my_token::total_supply(&treasury) == 1_000);
        assert!(coin.value() == 1_000);

        // Split 400
        let split_part = my_token::split(&mut coin, 400, ctx);
        assert!(coin.value() == 600);
        assert!(split_part.value() == 400);

        // Join back
        my_token::join(&mut coin, split_part);
        assert!(coin.value() == 1_000);
        assert!(my_token::total_supply(&treasury) == 1_000);

        // Burn 250
        let burn_part = my_token::split(&mut coin, 250, ctx);
        my_token::burn(&mut treasury, burn_part);
        assert!(my_token::total_supply(&treasury) == 750);
        assert!(coin.value() == 750);

        // Burn remaining
        my_token::burn(&mut treasury, coin);
        assert!(my_token::total_supply(&treasury) == 0);

        // Transfer TreasuryCap so test ends cleanly
        transfer::public_transfer(treasury, ADMIN);
        sc.end();
    }
}
