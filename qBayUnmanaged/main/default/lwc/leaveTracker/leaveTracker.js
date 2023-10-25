import { LightningElement, api, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Leave_Request__c.Name__c';
import EMPLOYEE_ID_FIELD from '@salesforce/schema/Leave_Request__c.Employee_Id__c';
import LEAVE_TYPE_FIELD from '@salesforce/schema/Leave_Request__c.Leave_Type__c';
import LEAVE_COUNT_FIELD from '@salesforce/schema/Leave_Request__c.Leave_Count__c';
import FROM_FIELD from '@salesforce/schema/Leave_Request__c.From__c';
import TO_FIELD from '@salesforce/schema/Leave_Request__c.To__c';
import REQUESTING_FIELD from '@salesforce/schema/Leave_Request__c.Requesting__c';
import REASON_FIELD from '@salesforce/schema/Leave_Request__c.Reason_for_Leave__c';
import REPORTING_TO_FIELD from '@salesforce/schema/Leave_Request__c.Reporting_To__c';
import STATUS_FIELD from '@salesforce/schema/Leave_Request__c.Status__c';
import REMAINING_LEAVE_FIELD from '@salesforce/schema/Leave_Request__c.Remaining_Leave__c';
import { NavigationMixin } from 'lightning/navigation';

 

export default class LeaveTracker extends NavigationMixin(LightningElement) {
    // objectApiName is "Leave Request" when this component is placed on an Leave Request record page
    @api name;
    @api employeeId;
    @api leavetype;
    @api leavecount;
    @api from;
    @api to;
     @api requesting;
    @api reason;
    @api reportingto;
    @api status;
    @api remainingleave;



    @api objectApiName;
    fields = {
NAME_FIELD:NAME_FIELD,
EMPLOYEE_ID_FIELD:EMPLOYEE_ID_FIELD,
LEAVE_TYPE_FIELD: LEAVE_TYPE_FIELD,
LEAVE_COUNT_FIELD: LEAVE_COUNT_FIELD,
FROM_FIELD:FROM_FIELD,
TO_FIELD :TO_FIELD ,
REQUESTING_FIELD:REQUESTING_FIELD,
REASON_FIELD: REASON_FIELD,
REPORTING_TO_FIELD: REPORTING_TO_FIELD,
STATUS_FIELD: STATUS_FIELD,
REMAINING_LEAVE_FIELD: REMAINING_LEAVE_FIELD,
    };

 
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        if (currentPageReference) {
            const state = currentPageReference.state;
            if (state.c__name && state.c__employeeId ) {
                this.name = state.c__name;
                this.employeeId = state.c__employeeId;
            
                this.loadUserInfo();
            }
        }
    }

    loadUserInfo() {
        // Implement your user info retrieval logic here
        // You can use Apex methods or other means to fetch user info
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "LEAVE REQUEST created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);

        this.name = '';
        this.employeeId = '';
        this.leavetype = '';
        this.leavecount = '';
        this.from = '';
        this.to = '';
        this.requesting = '';
        this.reason = '';
        this.reportingto = '';
        this.status = '';
        this.remainingleave = '';
        
    }
}