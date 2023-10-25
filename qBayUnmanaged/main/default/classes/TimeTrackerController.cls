public class TimeTrackerController {
	
    @AuraEnabled
    public static Boolean hasCheckInForToday(String name) {
        Date today = Date.today();
        List<Time_Tracker__c> existingCheckIns = [SELECT Id, Start_Time__c FROM Time_Tracker__c WHERE Name__c = :name AND Start_Time__c >= :today AND Start_Time__c < :today.addDays(1)];
        return !existingCheckIns.isEmpty();
    }
    
    @AuraEnabled
    public static Time_Tracker__c hasCheckInForToday1(String name) {
        Date today = Date.today();
        Time_Tracker__c existingCheckIns1 = [SELECT Id, Start_Time__c FROM Time_Tracker__c WHERE Name__c = :name AND Start_Time__c >= :today AND Start_Time__c < :today.addDays(1)];
        return existingCheckIns1;
    }
    
     @AuraEnabled
    public static Boolean hasCheckOutForToday(String name, string employeeId) {
        Date today = Date.today();
        List<Time_Tracker__c> existingCheckIns = [SELECT Id FROM Time_Tracker__c WHERE Name__c = :name AND End_Time__c >= :today AND End_Time__c < :today.addDays(1)];
        return !existingCheckIns.isEmpty();
    }

    @AuraEnabled
    public static void saveTimeTrackerRecord(String name, String employeeId) {
        try {
            if (String.isNotBlank(name)) { // Check if name is not null or empty
                Time_Tracker__c timeTrackerRecord = new Time_Tracker__c(
                    Name__c = name,
                    Employee_Id__c = employeeId,
                    Start_Time__c = System.now()
                );
                insert timeTrackerRecord;
                System.debug('Time Tracker Record Inserted: ' + timeTrackerRecord);
            }
        } catch (Exception ex) {
            System.debug('Error Message: ' + ex.getMessage());
            System.debug('Stack Trace: ' + ex.getStackTraceString());
            throw ex;
        }
    }

    @AuraEnabled
    public static void getCheckout(String name, string employeeId) {
        List<Time_Tracker__c> newTime = [SELECT Id, Name__c, Start_Time__c, End_Time__c FROM Time_Tracker__c WHERE Name__c = :name];
        for (Time_Tracker__c tc : newTime) {
            if (tc.End_Time__c == null) {
                tc.End_Time__c = System.now();
                tc.Employee_Id__c = employeeId;
                update tc;
            }
        }
    }
}