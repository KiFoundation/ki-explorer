<p align="right">
    <img width=150px src="https://wallet-testnet.blockchain.ki/static/img/icons/ki-chain.png" />
</p>

# Ki Explorer
This repository hosts `ki-explorer`, a block explorer for the KiChain.

Currently exploring network **KiChain-t (Testnet)** Live on: **[blockchain.ki](https://blockchain.ki)**

## How to run The  Ki Explorer

1.  Open `settings.json`.
2.  Update the RPC and LCD URLs.
3.  Update Bech32 address prefixes.
4.  Update genesis file location.

### Run in local

```sh
meteor npm install
meteor update
meteor --settings settings.json
```

### Run in production

```sh
./build.sh
```

It will create a packaged Node JS tarball at `../output`. Deploy that packaged Node JS project with process manager like [forever](https://www.npmjs.com/package/forever) or [Phusion Passenger](https://www.phusionpassenger.com/library/walkthroughs/basics/nodejs/fundamental_concepts.html).

* * *

## Disclaimer

The Ki Explorer is based on the [Big Dipper](https://github.com/forbole/big-dipper) project by [Forbole](https://github.com/forbole).
