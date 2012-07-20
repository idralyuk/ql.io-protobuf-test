#!/bin/sh
curl -sS -H "Content-Type:text/xml;charset=UTF-8" -H "X-EBAY-SOA-MESSAGE-PROTOCOL:SOAP11" -H "X-EBAY-SOA-RESPONSE-DATA-FORMAT:XML" -H "X-EBAY-SOA-OPERATION-NAME:findItemsByKeywords" -H "X-EBAY-SOA-SECURITY-APPNAME:eBayinc2e-d3b4-4a21-a765-47cc6b01cf7" -X POST -d @findItemsByKeywordsRequest.xml -o mock.xml https://svcs.ebay.com/services/search/FindingService/v1
