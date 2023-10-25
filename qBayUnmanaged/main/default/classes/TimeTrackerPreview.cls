public with sharing class TimeTrackerPreview {
    @AuraEnabled(cacheable=true)
    public static List<Time_Tracker__c> getTimeTrackerRecords(String userName) {
        List<Time_Tracker__c> timeTrackerRecords = new List<Time_Tracker__c>();
        
        // Query User records
        List<User__c> users = [SELECT Id, Name FROM User__c];
        
        // Query Time Tracker records
        List<Time_Tracker__c> timeTrackers = [SELECT Id, Name__c, Start_Time__c, End_Time__c,Total_Hours__c  FROM Time_Tracker__c where name__c=:userName order by Start_Time__c desc limit 7 ];
        
        // Match records based on Name
        for (User__c user : users) {
            for (Time_Tracker__c timeTracker : timeTrackers) {
                if (user.Name == timeTracker.Name__c) {
                    timeTrackerRecords.add(timeTracker);
                }
            }
        }
        
        return timeTrackerRecords;
    }
}