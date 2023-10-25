public with sharing class UpcomingLeavesController {
    @AuraEnabled(cacheable=true)
    public static List<Up_Coming_Leave__c  > getUpcomingLeaves() {
        return [SELECT Id, Name, Date__c FROM Up_Coming_Leave__c  ];
    }
}