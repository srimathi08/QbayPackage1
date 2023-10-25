public with sharing class EmployeeController {
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployeeBirthdaysByMonth(Integer month) {
        // Query Employee__c records where the birth month matches the provided month
        return [SELECT Id, Name, Date_Of_Birth__c FROM Employee__c WHERE CALENDAR_MONTH(Date_Of_Birth__c) = :month];
    }

    @AuraEnabled
    public static void updateUser(Map<String, Object> fields) {
        // Update the User__c record based on the provided fields
        try {
            User__c Record = new User__c(
                Id = (Id)fields.get('Id'),
                Name = (String)fields.get('Name'),
                Email__c = (String)fields.get('Email__c'),
                Designation__c = (String)fields.get('Designation__c'),
                Working_Location__c = (String)fields.get('Working_Location__c')
                // Add more fields as needed
            );

            update Record;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating user record: ' + e.getMessage());
        }
    }

}