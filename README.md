# Code Climate Collector SDK

The SDK for building Code Climate Collectors. This package provides code for
collectors to use in their implementations, and a CLI to help with developing
collectors.

## Development

Clone this repo, run `yarn install` to install dependencies. `yarn test` will
run unit tests.

## CLI

From within a collector package that depends on this package, run `yarn
codeclimate-collector` to run the CLI.

### Running a collector

The CLI can be used to run collectors locally during development to verify
behavior. The following commands are currently supported:

```
verify-configuration <collector> <config-path>                               Verify a collector's configuration
sync-stream <collector> <config-path> <stream-id> <earliest-data-cutoff>     Run a sync-stream process for a collector
```

## Creating a new collector

See https://github.com/codeclimate/create-codeclimate-collector.
