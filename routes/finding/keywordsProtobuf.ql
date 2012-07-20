return select searchResult.item, errorMessage
from ebay.finding.findItemsByKeywordsProtobuf where keywords = '{keywords}'
via route '/ebay/finding/keywords/protobuf/{keywords}' using method get;
