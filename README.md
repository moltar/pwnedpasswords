# pwnedpasswords

[![Travis](https://travis-ci.org/moltar/pwnedpasswords.svg?branch=master)](https://travis-ci.org/moltar/pwnedpasswords)
[![npm](https://img.shields.io/npm/dm/pwnedpasswords.svg)](https://www.npmjs.com/package/pwnedpasswords)
[![Known Vulnerabilities](https://snyk.io/test/npm/pwnedpasswords/badge.svg)](https://snyk.io/test/npm/pwnedpasswords)

A dependency-free [Node.js module](https://www.npmjs.com/package/pwnedpasswords) for interfacing with the [PwnedPasswords API](https://haveibeenpwned.com/API/v2#PwnedPasswords) by [Troy Hunt](https://www.troyhunt.com/) ([haveibeenpwned.com](https://haveibeenpwned.com/)).

This module implements the new and improved version 2 of the API. This version of the API implements k-Anonymity and does **NOT** send even the hashed version of the passwords to third party. It only sends the first 5 characters of the SHA-1 hash. You can read more about it in the Troy Hunt's [blog announcement post](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/).

The reason I chose not to use any dependencies (e.g. `request` or `got`) is first, because it is a pretty simple API and can be handled easily by the built-in `https` module. But mainly, it is for security reasons. Dependency chain can get deep and unpredictable. One rogue module down the chain can intercept requests and hand over passwords elsewhere.

## Installation

Please review the code before use.

Install and save exact module version, to avoid installing, another, potentially vulnerable version in the future.

If you need to upgrade, again, review the code and upgrade to an exact version you have witnessed yourself.

```sh
npm install --save-exact pwnedpasswords
```

## Usage

The module implements three interfaces. Callback, promises and CLI.

Return value is an integer with a count of input password prevalence.

Zero (`0`) is returned when the password is not found.

### Promises

```js
const pwnedpasswords = require('pwnedpasswords')

pwnedpasswords('password')
  .then(count => {
    console.log('Password was found %d times.', count)
  })
  .catch(err => {
    console.error(err)
  })

```

### Callback

```js
const pwnedpasswords = require('pwnedpasswords')

pwnedpasswords('password', (err, count) => {
  if (err) {
    console.error(err)
  }

  console.log('Password was found %d times.', count)
})
```

### CLI

It is not recommended to use this command with real passwords, as you are exposing the password to the process list and shell history. But this can be used for testing and educational scenarios or in other shell scripts.

```sh
$> ./node_modules/.bin/pwnedpasswords
3730471
```

Or if installed globally, then run:

```sh
$> pwnedpasswords password
3730471
```

Or via `npx`:

```sh
$> npx -q pwnedpasswords password
3730471
```

## Dependencies

None

## License

MIT