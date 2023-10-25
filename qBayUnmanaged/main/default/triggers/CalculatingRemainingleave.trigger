trigger CalculatingRemainingleave on Leave_Request__c (before insert,before update) {
    // Create a map to store the total leave for each Employee__c record
    Map<String, Decimal> employeeLeaveMap = new Map<String, Decimal>();
    Map<String, String> employeeLeaveTypeMap = new Map<String, String>(); // Map to store leave type for each employee
    // Collect a list of Employee__c record Names associated with Leave_request__c records
    Set<String> userNames = new Set<String>();

    for (Leave_request__c leaveRequest : Trigger.new) {
        userNames.add(leaveRequest.name__c);
    }


    // Query Employee__c records and their associated leave types
    List<User__c> users = [SELECT Id, Name, Sick_Leave__c, Casual_Leave__c, Earned_Leave__c, Bereavement_Leave__c, Marriage_Leave__c,
                                   Work_From_Home__c, Loss_of_Pay__c
                                  FROM User__c
                                  WHERE Name IN :userNames];

    // Populate the employeeLeaveMap with leave balances and leave types
    for (User__c userloop : users) {
        Decimal totalLeave = 0; // Initialize total leave to 0

        // Calculate total leave based on leave type only if status__c is "Approved"
        for (Leave_request__c leaveRequest : Trigger.new) {
            if (leaveRequest.name__c == userloop.Name && leaveRequest.status__c == 'Approved') {
                String leaveType = leaveRequest.Leave_Type__c;
                Decimal leaveCount = leaveRequest.Leave_Count__c;

                // Check if leave balance is sufficient and leaveCount is greater than 0
                if (leaveType == 'Sick Leave' && leaveCount > 0 && leaveCount <= 
userloop.Sick_Leave__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Sick_Leave__c;
                } else if (leaveType == 'Casual Leave' && leaveCount > 0 && leaveCount <= userloop.Casual_Leave__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Casual_Leave__c;
                } else if (leaveType == 'Earned Leave' && leaveCount > 0 && leaveCount <= userloop.Earned_Leave__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Earned_Leave__c;
                } else if (leaveType == 'Bereavement Leave' && leaveCount > 0 && leaveCount <= userloop.Bereavement_Leave__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Bereavement_Leave__c;
                } else if (leaveType == 'Marriage Leave' && leaveCount > 0 && leaveCount <= userloop.Marriage_Leave__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Marriage_Leave__c;
                } else if (leaveType == 'Work From Home' && leaveCount > 0 && leaveCount <= userloop.Work_From_Home__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Work_From_Home__c;
                } else if (leaveType == 'Loss Of Pay' && leaveCount > 0 && leaveCount <= userloop.Loss_of_Pay__c) {
                    totalLeave -= leaveRequest.Leave_Count__c - userloop.Loss_of_Pay__c;
                } else {
                    // Throw an error for insufficient balance
                    leaveRequest.addError('Insufficient leave balance for ' + leaveType + ' for employee with Name ' + userloop.Name);
                }

 

                // Update the leave type in the employeeLeaveTypeMap for reference
                employeeLeaveTypeMap.put(leaveRequest.name__c, leaveType);

 

                // Add validation for From__c and To__c
                if (leaveRequest.From__c > leaveRequest.To__c) {
                    leaveRequest.addError('From date should not be greater than To date');
                } else if (leaveRequest.To__c < leaveRequest.From__c) {
                    leaveRequest.addError('To date should not be lesser than From date');
                }
            }
        }

 

        // Update the employeeLeaveMap with the calculated total leave
        employeeLeaveMap.put(userloop.Name, totalLeave);
    }

 

    // Update the Remaining_Leave__c field on the Leave_request__c records
    for (Leave_request__c leaveRequest : Trigger.new) {
        if (leaveRequest.status__c == 'Approved') {
            Decimal totalLeave = employeeLeaveMap.get(leaveRequest.name__c);
            leaveRequest.Remaining_Leave__c = totalLeave;
        }
    }

 

    // Update the Employee__c records with the modified leave type fields
    List<User__c> employeesToUpdate = new List<User__c>();
    for (User__c userloop: users) {
        String employeeName = userloop.Name;
        Decimal totalLeave = employeeLeaveMap.get(employeeName);
        String leaveType = employeeLeaveTypeMap.get(employeeName);

 

        // Update the corresponding leave type field in the Employee__c object
        if (leaveType == 'Sick Leave') {
            userloop.Sick_Leave__c = totalLeave;
        } else if (leaveType == 'Casual Leave') {
            userloop.Casual_Leave__c = totalLeave;
        } else if (leaveType == 'Earned Leave') {
            userloop.Earned_Leave__c = totalLeave;
        } else if (leaveType == 'Bereavement Leave') {
            userloop.Bereavement_Leave__c = totalLeave;
        } else if (leaveType == 'Marriage Leave') {
            userloop.Marriage_Leave__c = totalLeave;
        } else if (leaveType == 'Work From Home') {
            userloop.Work_From_Home__c = totalLeave;
        } else if (leaveType == 'Loss Of Pay') {
            userloop.Loss_of_Pay__c = totalLeave;
        }
        employeesToUpdate.add(userloop);
    }

 

    // Update the Employee__c records with the modified leave type fields
    update employeesToUpdate;
}