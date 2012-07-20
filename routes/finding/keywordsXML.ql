return select searchResult.item, errorMessage
from ebay.finding.findItemsByKeywordsXML where keywords = '{keywords}'
via route '/ebay/finding/keywords/xml/{keywords}' using method get;
