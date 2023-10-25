public with sharing class UserController {

    @AuraEnabled(cacheable=true)

    public static List<User__c> fetchUsers() {

        return [SELECT Id, Name__c, Employee_Id__c ,Designation__c, Date_Of_Joining__c, Role__c, Email__c, Date_Of_Birth__c,Driver_s_License_Number__c, License_Expiry_Date__c, SSN_Number__c, SIN_Number__c, Nationality__c  FROM User__c];

    }

}