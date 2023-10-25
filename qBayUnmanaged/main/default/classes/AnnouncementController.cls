public with sharing class AnnouncementController {
    @AuraEnabled(cacheable=true)
    public static List<Announcement__c> getAnnouncements() {
        return [SELECT Id, 	Image__c, Announcements__c, Date__c FROM Announcement__c];
    }
}