module tagger::tag {
    use std::signer;
    use std::string::{String};
    use std::table::{Self, Table};


    struct Tag has store, drop {
        item_id: String,
        metadata: String,
        creator: address,
    }

    struct Tagger has key, store {
        owner: address,
        tag_map: Table<u256, Tag>,
        judges_map: Table<u256, bool>,
        index: u256,
        chairman: address,
    }

    // Combine addr_aggregator and service_aggregator init.
    public entry fun init(acct: &signer, chairman: address) {
       init_tragger(acct, chairman);
    }

    // init 
    public fun init_tragger(acct: &signer, chairman: address) {
        let tagger = Tagger {
            owner: signer::address_of(acct),
            index: 0,
            tag_map: table::new(),
            judges_map: table::new(),
            chairman
        };
        move_to<Tagger>(acct, tagger);
    }

    public fun tag_item(acct: &signer, item_id: String, metadata: String) acquires Tagger {
        let tagger = borrow_global_mut<Tagger>(signer::address_of(acct));

        let tag = Tag {
            item_id: item_id,
            metadata: metadata,
            creator : signer::address_of(acct),
        };


        table::add(&mut tagger.tag_map, tagger.index, tag);
        tagger.index = tagger.index + 1;

    }

    public entry fun judge_tag(acct: &signer, tag_index: u256, decide: bool) acquires Tagger {
        let tagger = borrow_global_mut<Tagger>(signer::address_of(acct));
        table::upsert(&mut tagger.judges_map, tag_index, decide);
    }

    #[view]
    public fun get_index(owner: address) : u256 acquires Tagger {
        borrow_global<Tagger>(owner).index
    }

}