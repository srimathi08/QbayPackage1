public with sharing class TimeSheetController {
    @AuraEnabled
    public static Boolean insertNameRecord(String name) {
        List<TimeSheet__c> existingRecords = [SELECT Id FROM TimeSheet__c WHERE Name__c = :name];
        return !existingRecords.isEmpty();
    }

    @AuraEnabled(cacheable=true)
    public static User__c getUserInfo(String username) {
        try {
            // Query the User__c object to fetch the Name based on the Username__c field
            return [SELECT Id, Name, Employee_Id__c FROM User__c WHERE Username__c = :username LIMIT 1];
        } catch (Exception ex) {
            // Handle any errors that occurred during the query
            System.debug('Error fetching user info: ' + ex.getMessage());
            return null;
        }
    }

    

  @AuraEnabled
    public static void saveTimeSheetRecord(String name, String employeeId, String description, date inputdate) {
          TimeSheet__c ts = new TimeSheet__c();
        ts.Name__c = name;
        ts.Employee_Id__c = employeeId;
        ts.Description__c = description;
        ts.Date__C = inputdate;
        insert ts;
        System.debug('ts'+ts);
    }
    
    @AuraEnabled
    public static Timesheet__c createTimesheet(String Name,Date iDate,String Description) {
        system.debug('acc'+Name);
        system.debug('acc'+iDate);
        System.debug('acc'+Description);
        Timesheet__c ts = new Timesheet__c();
        ts.Name__c = Name;
        System.debug('ts.Name__c'+ts.Name__c);
        ts.Date__c=iDate;
        System.debug('ts.Date__c'+ts.Date__c);
        ts.Description__c=Description;
        System.debug('ts.Description__c'+ts.Description__c);
        insert ts;
        return ts;
    }
    
}