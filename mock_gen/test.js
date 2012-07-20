'use strict';

var fs = require('fs'),
    _ = require('underscore'),
    protobuf = require('protobuf'),
    Schema = protobuf.Schema;

var fis_schema = new Schema(fs.readFileSync(__dirname + '/FindItemsByKeywords.desc'));

var FindItemsByKeywordsResponse = fis_schema['com.ebay.marketplace.search.v1.services.finditemservice.FindItemsByKeywordsResponse'];

var buf = fs.readFileSync('mock.protobuf');

var fir = FindItemsByKeywordsResponse.parse(buf);

console.log(JSON.stringify(fir));

