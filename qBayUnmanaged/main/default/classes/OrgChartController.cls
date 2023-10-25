public with sharing  class  OrgChartController {
    @AuraEnabled(cacheable=true)
    public static List<Organization_Chart__c> getOrganization() {
        return [SELECT Id,Organization_Chart__c FROM Organization_Chart__c];
    }
}