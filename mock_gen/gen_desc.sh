#!/bin/bash

NAME=FindItemsByKeywords

protoc --descriptor_set_out $NAME.desc $NAME.proto

cp $NAME.desc ../tables/finding/util/