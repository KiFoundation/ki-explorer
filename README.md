<p align="right">
    <img width=150px src="https://wallet-testnet.blockchain.ki/static/img/icons/ki-chain.png" />
</p>

# Ki Explorer
This repository hosts `ki-explorer`, a block explorer for the KiChain.

Currently exploring network **KiChain-t (Testnet)** Live on: **[blockchain.ki](https://blockchain.ki)**

## How to run The  Ki Explorer
### Install meteor
The Ki Explorer is a [Meteor](https://www.meteor.com/) application. To install the latest Meteor release, run the following command :
```sh
curl https://install.meteor.com/ | sh
```

### Set the correct settings
1.  Open `default_settings.json`.
2.  Update the RPC and LCD URLs.
3.  Update Bech32 address prefixes.
4.  Update genesis file location.

### Run in local

```sh
meteor npm install
meteor update
meteor --settings default_settings.json
```

### Run in production

```sh
./build.sh
```

It will create a packaged Node JS tarball at `../output`. Deploy that packaged Node JS project with process manager like [forever](https://www.npmjs.com/package/forever) or [Phusion Passenger](https://www.phusionpassenger.com/library/walkthroughs/basics/nodejs/fundamental_concepts.html).

* * *

## Disclaimer

The Ki Explorer is based on the [Big Dipper](https://github.com/forbole/big-dipper) project by [Forbole](https://github.com/forbole).

## Security
If you discover a security vulnerability in this project, please report it to security@foundation.ki. We will promptly address all security vulnerabilities.
