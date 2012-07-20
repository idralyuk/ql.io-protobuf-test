#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ ! -d  $DIR/node_modules ]; then
    CWD=`pwd`
    cd $DIR
    make install
    cd $CWD
fi

node $DIR/mock_server.js &
