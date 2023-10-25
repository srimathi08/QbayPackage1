public class PassPortPreview {
     @AuraEnabled(cacheable=true)
    public static List<Passport__c> getPassportRecords(String userName) {
        List<Passport__c> passportRecords = new List<Passport__c>();
        
        // Query User records
        List<User__c> users = [SELECT Id, Name FROM User__c];
        
        // Query Passport records
        List<Passport__c> passports = [SELECT Id, Name__c,	Name_as_per_Passport__c ,passport_Number__c,Place_of_Issue__c,Expired_date__c,Issued_date__c FROM Passport__c WHERE Name__c = :userName];
        
        // Match records based on Name
        for (User__c user : users) {
            for (Passport__c passport : passports) {
                if (user.Name == passport.Name__c) {
                    passportRecords.add(passport);
                }
            }
        }
        
        return passportRecords;
    }
}