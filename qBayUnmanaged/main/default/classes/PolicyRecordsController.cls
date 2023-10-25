public with sharing class PolicyRecordsController {
    @AuraEnabled(cacheable=true)
    public static List<Policy_Records__c> getPdfUploaders() {
        return [SELECT Id, Name FROM Policy_Records__c];
    }
}