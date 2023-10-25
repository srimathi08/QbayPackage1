public with sharing class TimesheetpreviewtableController {
    @AuraEnabled(cacheable=true)
    public static List<Timesheet__c> getTimesheetData(String userName) {
        // Example SOQL query to fetch timesheet records
        return [SELECT Id, Project_Name__r.name, Work_Done__c, Date__c, Total_Hours__c FROM Timesheet__c where Name__c=:userName order by Date__c desc Limit 7];
    }
}