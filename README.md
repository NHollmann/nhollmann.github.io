# Nicolas Hollmann Github.io [![Build Status](https://travis-ci.org/NHollmann/nhollmann.github.io.svg?branch=develop)](https://travis-ci.org/NHollmann/nhollmann.github.io)

This is just a simple repository list for github pages.

The purpose of this file is to give https://nhollmann.github.io/ a usable landing page if anybody should try to access it directly.

## Installation

1. Clone repository
2. Install dependencies with `yarn`

## Commands

To compile the TypeScript source to JavaScript use `yarn compile`.
To build a static page use `yarn build`.
If you want automatic rebuilding while developing new features use `yarn dev`.

## Usage

All sources are in the `src` directory. The `builder.ts` file is the main entry point for the static site generator. It uses scripts from the `src/lib` directory to build the site.

Files in the `src/static` directory are copied unchanged to the target directory. For every html file in the `src/pages` direcoty a page is generated. Every page can use data loaded by the builder and partials from the `src/partials` directory.
