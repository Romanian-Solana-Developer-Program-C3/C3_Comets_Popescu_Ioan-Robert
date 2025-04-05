/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/favorites.json`.
 */
export type Favorites = {
  "address": "31eTrr43nYd8CugaZHpkZJNDCTLc85g3Uc7YLspuXg1h",
  "metadata": {
    "name": "favorites",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "setFavourites",
      "discriminator": [
        38,
        252,
        8,
        46,
        221,
        209,
        62,
        138
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "favourites",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  118,
                  111,
                  117,
                  114,
                  105,
                  116,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "color",
          "type": "string"
        },
        {
          "name": "number",
          "type": "u64"
        },
        {
          "name": "hobbies",
          "type": {
            "vec": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "favourites",
      "discriminator": [
        46,
        88,
        177,
        163,
        172,
        144,
        7,
        1
      ]
    }
  ],
  "types": [
    {
      "name": "favourites",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "color",
            "type": "string"
          },
          {
            "name": "number",
            "type": "u64"
          },
          {
            "name": "hobbies",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};
