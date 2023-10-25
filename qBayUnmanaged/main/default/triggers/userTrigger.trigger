trigger userTrigger on User__c (before insert) {
     
    if (Trigger.isBefore && Trigger.isInsert) {
        for (User__c us : Trigger.new) {
            // Check if Salutation__c is not null or empty, and use a space if it is
            String salutation = String.isBlank(us.Salutation__c) ? '' : us.Salutation__c + ' ';
            
            // Check if Middle_Name__c is not null or empty, and use a space if it is
            String middleName = String.isBlank(us.Middle_Name__c) ? '' : us.Middle_Name__c + ' ';
            
            us.Name = salutation + us.First_Name__c + ' ' + middleName + us.Last_Name__c;
            System.debug('us.Name: ' + us.Name);
        }        
}
}