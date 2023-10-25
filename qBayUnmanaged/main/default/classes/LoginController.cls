public with sharing class LoginController {
    @AuraEnabled(cacheable=true)
    public static Boolean checkCredentials(String username, String password) {
        // Query the Login_Credentials__c custom object for the given username
        List<User__c> credentialsList = [SELECT Id, Password__c FROM User__c WHERE Username__c = :username LIMIT 1];

        if (!credentialsList.isEmpty()) {
            // If credentials are found, compare the provided password with the stored password
            User__c credentials = credentialsList[0];
            return credentials.Password__c == password;
        }
        // Return false if no credentials found for the given username
        return false;
    }
    
        @AuraEnabled(cacheable=true)
    public static User__c getUserInfo(String username) {
        try {
            // Query the User__c object to fetch the Name based on the Username__c field
            return [SELECT Id, Name, Employee_Id__c ,Designation__c, Role__c, Email__c, Date_Of_Birth__c,Aadhar_Card_Number__c,Emergency_Contact__c,X10th_Stream__c,X10th__c,X12th_Stream__c,X12th_Percentage__c,UG_Degree__c,UGPercentage__c,PG_Degree__c,PG_Percentage__c,Bank_Name__c,Account_Number__c,IFSC_Number__c,Bank_Details__c,Father_s_Name__c,Mother_s_Name__c,Marital_Status__c,Present_Address__c,Blood_Type__c,P_PAN_Number__c,Name_of_the_Organization__c,	WorkDesignation__c,	Working_Location__c,Gender__c,P_Mobile__c,	Passport_Number__c,	Passport_Valid_Till__c,	Work_Permit__c,Present_Address__City__s,Present_Address__CountryCode__s,Present_Address__PostalCode__s,Present_Address__StateCode__s,Present_Address__Street__s FROM User__c WHERE Username__c = :username LIMIT 1];
        } catch (Exception ex) {
            // Handle any errors that occurred during the query
            System.debug('Error fetching user info: ' + ex.getMessage());
            return null;
        }
    }
    
    
}