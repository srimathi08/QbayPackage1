public with sharing class LwcSearchFilterCtrl {
    @AuraEnabled
    public static List<sObject> getRecords(String objectName,string name,string employeeid,Date startDate,Date endDate) {
        System.debug('ObjectecName'+objectName);
        System.debug('ObjectecName'+name);
        System.debug('employeeid'+employeeid);
        System.debug('startDate'+startDate);
        System.debug('endDate'+endDate);
        String query ='SELECT Employee_Id__c, Name__c,';
        if (objectName == null) {
            return new List<sObject>();
        }
        if (objectName ==  'Time_Tracker__c') {
            query +=  ' Start_Time__c, End_Time__c, Total_Hours__c, CreatedDate FROM Time_Tracker__c';
            
        } if (objectName ==  'Timesheet__c') {
            query +=  ' Project_Name__c, Total_Hours__c, Date__c, Work_Done__c, CreatedDate FROM Timesheet__c';
            
        }  if (objectName ==  'Leave_Request__c') {
            query +=  ' Leave_Type__c, Leave_Count__c, Reason_for_Leave__c, Remaining_Leave__c, CreatedDate FROM Leave_Request__c';
        } if(name!=null &&name!='' &&employeeid!=null &&startDate!=null && endDate!=null){
            query+=' Where Name__c=:name AND Employee_Id__c=:employeeid AND CreatedDate>=:startDate AND CreatedDate<=:endDate';
            System.debug('query'+query);
        } else if(name!=null &&name!=''){
            query+=' Where Name__c=:name';
            System.debug('datequery'+query);
        }
        
        return Database.query(query);
    }
}