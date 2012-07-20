var fs = require('fs'),
    _ = require('underscore'),    
    Schema = require('protobuf').Schema,
    fis_schema = new Schema(fs.readFileSync(__dirname + '/util/FindItemsByKeywords.desc')),
    FindItemsByKeywordsResponse = fis_schema['com.ebay.marketplace.search.v1.services.finditemservice.FindItemsByKeywordsResponse'];

exports['parse response'] = function(args) {
    var length = 0, idx = 0;
    _.each(args.body, function(b) {
        length += b.length;
    });
    
    var buf = new Buffer(length);
    _.each(args.body, function(b) {
        idx = idx + b.copy(buf, idx);
    });

    var fir = { 'findItemsByKeywordsResponse' : FindItemsByKeywordsResponse.parse(buf) };

    return {
        type: 'application/json',
        content: JSON.stringify(fir)
    };
}

exports['patch uri'] = function(options) {
    var statement = options.statement, uri = options.uri, params = options.params, count = 0;
    if(statement.offset && statement.limit) {
        uri.setParam('paginationInput.pageNumber', statement.offset / statement.limit);
    }
    uri.removeEmptyParams();

    count = 0
    if(params.FreeShippingOnly) {
        uri.addParam("itemFilter(" + count + ").name", 'FreeShippingOnly');
        uri.addParam("itemFilter(" + count + ").value", params.FreeShippingOnly);
        count++;
    }
    if(params.MinPrice) {
        uri.addParam("itemFilter(" + count + ").name", 'MinPrice');
        uri.addParam("itemFilter(" + count + ").value", params.MinPrice);
        count++;
    }
    if(params.BestOfferOnly) {
        uri.addParam("itemFilter(" + count + ").name", 'BestOfferOnly');
        uri.addParam("itemFilter(" + count + ").value", params.BestOfferOnly);
        count++;
    }
    if(params.ListingType) {
        uri.addParam("itemFilter(" + count + ").name", 'ListingType');
        uri.addParam("itemFilter(" + count + ").value", params.ListingType);
        count++;
    }
    return uri;
}

exports['patch status'] = function(options) {
    var json = options.body;
    if(json && ((json.findItemsByKeywordsResponse && json.findItemsByKeywordsResponse.ack === 'Failure') ||
        json.errorMessage)) {
        return 400;
    }
    else {
        return 200;
    }
}