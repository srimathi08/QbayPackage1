public with sharing class LeaveRequestpreviewtableController {
    @AuraEnabled(cacheable=true)
    public static List<Leave_Request__c> getLeaveRequests(string userName) {
        return [SELECT Id, Leave_Type__c, Leave_Count__c, Remaining_Leave__c, Status__c FROM Leave_Request__c where Name__c=:userName order by CreatedDate DESC limit 7];
    }
}