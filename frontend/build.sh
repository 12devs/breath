#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

# npm install
npm run build

cd ..
