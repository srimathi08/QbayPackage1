import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import EMPLOYEE_NAME_FIELD from '@salesforce/schema/Exit_Details__c.Employee_Name__c';
import DESIGNATION_FIELD from '@salesforce/schema/Exit_Details__c.Designation__c';
import DATE_OF_JOINING_FIELD from '@salesforce/schema/Exit_Details__c.Date_Of_Joining__c';
import DATE_OF_RESIGNATION_FIELD from '@salesforce/schema/Exit_Details__c.Date_of_resignation__c';
import LAST_WORKING_DATE_FIELD from '@salesforce/schema/Exit_Details__c.Last_working_date__c';
import REASON_FOR_EXIT_FIELD from '@salesforce/schema/Exit_Details__c.Reason_for_exit__c';
import STATUS_OF_EXIT_INTERVIEW_FIELD from '@salesforce/schema/Exit_Details__c.Status_of_Exit_Interview__c';
import TYPE_OF_EXIT_FIELD from '@salesforce/schema/Exit_Details__c.Type_of_exit__c';
import ELIGIBLE_TO_REHIRE_FIELD from '@salesforce/schema/Exit_Details__c.Eligible_to_rehire__c';
import ASSET_SUBMITTED_FIELD from '@salesforce/schema/Exit_Details__c.Asset_submitted__c';

export default class LightningRecordFormCreateExampleLWC extends LightningElement {
   
    @api objectApiName;
    fields = [EMPLOYEE_NAME_FIELD,DESIGNATION_FIELD,DATE_OF_JOINING_FIELD,DATE_OF_RESIGNATION_FIELD,LAST_WORKING_DATE_FIELD,REASON_FOR_EXIT_FIELD,STATUS_OF_EXIT_INTERVIEW_FIELD,TYPE_OF_EXIT_FIELD,ELIGIBLE_TO_REHIRE_FIELD,ASSET_SUBMITTED_FIELD];
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "EXIT DETAIL created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
}