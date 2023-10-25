public class LeaveRequestAlert {
    @InvocableMethod(label='Send Email to Manager' description='Sends an email to the manager')
    public static void sendEmail(List<Id> leaveRequestIds) {
        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
       
        System.debug('Entering sendEmail method');

        // Query the Org-Wide Email Address you want to use as the "From" address
        OrgWideEmailAddress orgWideEmail = [SELECT Id FROM OrgWideEmailAddress WHERE Address = 'deona.sherine@quadrobay.com' LIMIT 1];

        try {
            for (Id leaveRequestId : leaveRequestIds) {
                // Query the Leave Request record
                Leave_Request__c leaveRequest = [SELECT Id, Employee_Name__r.name, Reporting_To__r.W_Email__c, Reporting_To__r.name,
                                                 Name__c, Leave_Type__c, From__c, To__c
                                                 FROM Leave_Request__c WHERE Id = :leaveRequestId];
                                                   
                System.debug('Query executed. leaveRequest: ' + leaveRequest);

                // Generate the record page URL
                String recordPageUrl = '/' + leaveRequest.Id; // Assuming that the object name is the same as the API name

                // Create an EmailMessage object
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                
                // Set the "From" address using the Org-Wide Email Address ID
                email.setOrgWideEmailAddressId(orgWideEmail.Id);
                
                // Set the recipient's email address
                email.setToAddresses(new String[] { leaveRequest.Reporting_To__r.W_Email__c });
                System.debug('Recipient email address set: ' + leaveRequest.Reporting_To__r.W_Email__c );

                // Set the email subject
                email.setSubject('Leave Request Created');

                // Create an HTML email body with the link to the record page
                String emailBody = 'Hi ' + leaveRequest.Reporting_To__r.name + ',<br><br>';
                emailBody += leaveRequest.Name__c + ' has requested for ' + leaveRequest.Leave_Type__c + ' from ' + leaveRequest.From__c + ' - ' + leaveRequest.To__c + '.<br><br>';
                emailBody += 'Please click the below link to access the record:<br>';
                emailBody += '<a href="' + recordPageUrl + '">Click here</a><br><br>';
                emailBody += 'Thank you.';
                
                email.setHtmlBody(emailBody);

                email.setSaveAsActivity(false); // Set to true if you want to log the email as an activity
                emails.add(email);
            }
            // Send the emails
            Messaging.sendEmail(emails);
            System.debug('Emails sent: ' + emails);
        } catch (Exception e) {
            System.debug('Email sending failed: ' + e.getMessage());
        }
    }
}