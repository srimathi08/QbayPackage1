// import { LightningElement, api, wire, track } from 'lwc';
// import { CurrentPageReference } from 'lightning/navigation';
// import { createRecord } from 'lightning/uiRecordApi';
// import getUserInfo from '@salesforce/apex/TimeSheetController.getUserInfo';
// import updateTimesheet from '@salesforce/apex/TimeSheetController.saveTimeSheetRecord';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import PROJECT_FIELD from '@salesforce/schema/Timesheet__c.Project_Name__c';
// import WORKDONE_FIELD from '@salesforce/schema/Timesheet__c.Work_Done__c';
// import DESCRIPTION_FIELD from '@salesforce/schema/Timesheet__c.Description__c';
// import TOTAL_HOURS from '@salesforce/schema/Timesheet__c.Total_Hours__c';
// import DATE from '@salesforce/schema/Timesheet__c.Date__c';
// import STATUS_FIELD from '@salesforce/schema/Timesheet__c.Employment_Status__c';
// import NAME_FIELD from '@salesforce/schema/Timesheet__c.Name__c';
// import EMPLOYEEID_FIELD from '@salesforce/schema/Timesheet__c.Employee_Id__c'
// import { NavigationMixin } from 'lightning/navigation';

// export default class LightningRecordFormCreateExampleLWC extends NavigationMixin(LightningElement) {
//     @api name;
//     @api employeeId;
//     @api recordId;
//     // objectApiName is "Account" when this component is placed on an account record page
//     @api objectApiName;
//     fields = [
//         NAME_FIELD ,
//         EMPLOYEEID_FIELD,
//         PROJECT_FIELD,
//         WORKDONE_FIELD,
//         DESCRIPTION_FIELD,
//         TOTAL_HOURS,
//         DATE,
//         STATUS_FIELD,
//     ];
//     myValue = 'My Account Name';
//     overrideValue(event) {
//         this.myValue = 'My New Name';
//     }
//     @wire(CurrentPageReference) 
//     setCurrentPageReference(currentPageReference) {
//         if (currentPageReference) {
//             const state = currentPageReference.state;
//             if (state.c__name && state.c__employeeId) {
//                 this.name = state.c__name;
//                 this.employeeId = state.c__employeeId;

//                 this.loadUserInfo();
//             }
//         }
//     }
//     loadUserInfo() {
//         getUserInfo({ username: this.name })
//             .then((result) => {
//                 if (result) {
//                     this.name = result.Name__c;
//                     this.employeeId = result.Employee_Id__c;
//                     console.log('User name from UserInfo: ' + this.name);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error fetching user info:', error);
//             });
//     }
    
//     handleSuccess(event) {
//         const name = this.name; // Use the value retrieved from the CurrentPageReference
//         const employeeId = this.employeeId; // Use the value retrieved from the CurrentPageReference
    
//         const fields = {};
//         fields[NAME_FIELD.fieldApiName] = name;
//         fields[EMPLOYEEID_FIELD.fieldApiName] = employeeId;
    
//         const recordInput = { apiName: 'Timesheet__c', fields  };
    
//         createRecord(recordInput)
//             .then(() => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Record saved successfully!',
//                         variant: 'success'
//                     })
//                 );
//             })
//             .catch(error => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error',
//                         message: error.body.message,
//                         variant: 'error'
//                     })
//                 );
//             });
//             // this.loadUserInfo();
//     }
    
// }

import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Timesheet__c.Name__c';
import EMPLOYEEID_FIELD from '@salesforce/schema/Timesheet__c.Employee_Id__c';
import PROJECT_FIELD from '@salesforce/schema/Timesheet__c.Project_Name__c';
import WORKDONE_FIELD from '@salesforce/schema/Timesheet__c.Work_Done__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Timesheet__c.Description__c';
import TOTAL_HOURS from '@salesforce/schema/Timesheet__c.Total_Hours__c';
import DATE from '@salesforce/schema/Timesheet__c.Date__c';
import STATUS_FIELD from '@salesforce/schema/Timesheet__c.Employment_Status__c';
// import EMPLOYEENAME from  '@salesforce/schema/Timesheet__c.Employee_Name__c';
import { NavigationMixin } from 'lightning/navigation';

export default class MyTimeSheet extends NavigationMixin(LightningElement) {
    @api parentRecId
    @api name;
    @api employeeId;
    // @api recordId;
    fields = {
        NAME_FIELD: NAME_FIELD,
        EMPLOYEEID_FIELD: EMPLOYEEID_FIELD,
        PROJECT_FIELD: PROJECT_FIELD,
        WORKDONE_FIELD: WORKDONE_FIELD,
        DESCRIPTION_FIELD: DESCRIPTION_FIELD,
        TOTAL_HOURS: TOTAL_HOURS,
        DATE: DATE,
        STATUS_FIELD: STATUS_FIELD,
        // EMPLOYEENAME:EMPLOYEENAME,
    };
    // connectedCallback(){
    //     this.parentRecId='a0H5g000004mvYfEAI'
    // }
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        if (currentPageReference) {
            const state = currentPageReference.state;
            if (state.c__name && state.c__employeeId) {
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
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record saved successfully!',
                variant: 'success'
                
            })
        );

    }
}