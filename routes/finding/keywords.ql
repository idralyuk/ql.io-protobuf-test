return select searchResult.item, errorMessage
from ebay.finding.findItemsByKeywords where keywords = '{keywords}'
via route '/ebay/finding/keywords/{keywords}' using method get;
