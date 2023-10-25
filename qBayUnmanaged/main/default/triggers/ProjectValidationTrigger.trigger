trigger ProjectValidationTrigger on Timesheet__c (before insert, before update) {
    for (Timesheet__c record : Trigger.new) {
        if (
            record.Project_Name__r.Employee_1__c == record.Name__c ||
            record.Project_Name__r.Employee_2__c == record.Name__c ||
            record.Project_Name__r.Employee_3__c == record.Name__c ||
            record.Project_Name__r.Project_Manager__c == record.Name__c
        ) {
            record.addError('Validation Error: The name cannot match any of the project employees or the project manager.');
        }
    }
}