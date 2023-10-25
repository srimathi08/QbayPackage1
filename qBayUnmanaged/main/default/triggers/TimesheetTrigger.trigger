trigger TimesheetTrigger on Timesheet__c (before insert) {
    Set<Id> userIds = new Set<Id>();
    system.debug('user id: ' + userIds);
    for (Timesheet__c TS : Trigger.New) {
        userIds.add(TS.OwnerId);
    }
    
    Map<Id, User__c> allUserMap = new Map<Id, User__c>([SELECT Id, Name FROM User__c WHERE Id IN :userIds]);
    system.debug('All User Map: ' + allUserMap);
    for (Timesheet__c TS : Trigger.New) {
        User__c owner = allUserMap.get(TS.OwnerId);
        if (owner != null) {
            TS.NAME__c = owner.Name; // Replace "Username__c" with the appropriate API name of the custom field on User__c containing the username.
        } else {
            TS.NAME__c = 'N/A';
        }
    }
}