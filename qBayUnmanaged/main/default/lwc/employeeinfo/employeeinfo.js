import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/User__c.Name__c';

import EMPLOYEEID_FIELD from '@salesforce/schema/User__c.Employee_Id__c';

import EMAIL_FIELD from '@salesforce/schema/User__c.Email__c';

import DATEOFBIRTH_FIELD from '@salesforce/schema/User__c.Date_Of_Birth__c';

import DESIGINATION from '@salesforce/schema/User__c.Designation__c';

import MOBILE from '@salesforce/schema/User__c.P_Mobile__c';

import EMECON from '@salesforce/schema/User__c.Emergency_Contact__c';

import GENDER from '@salesforce/schema/User__c.Gender__c';

import AADHAR from '@salesforce/schema/User__c.Aadhar_Card_Number__c';



import { NavigationMixin } from 'lightning/navigation';

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

    @api name;

    @api employeeId;

    @api email;

    @api dateofbirth;

    @api designation;

    @api mobile;

    @api emergencynum;

    @api gender;

    @api aadarnum;

    

 

    @api recordId;

    fields = {

        NAME_FIELD: NAME_FIELD,

        EMPLOYEEID_FIELD: EMPLOYEEID_FIELD,

        EMAIL_FIELD: EMAIL_FIELD,

        DATEOFBIRTH_FIELD: DATEOFBIRTH_FIELD,

        DESIGINATION: DESIGINATION,

        MOBILE: MOBILE,

        EMECON: EMECON,

        GENDER: GENDER,

        AADHAR: AADHAR,

    };

 

    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        if (currentPageReference) {

            const state = currentPageReference.state;

            if (state.c__name || state.c__employeeId || state.c__email || state.c__dateofbirth || state.c__designation || state.c__mobile || state.c__emergencynum || state.c__gender || state.c__aadarnum) {

                this.name = state.c__name;

                this.employeeId = state.c__employeeId;

                this.email = state.c__email;

                this.dateofbirth = state.c__dateofbirth;

                this.designation = state.c__designation;

                this.mobile = state.c__mobile;

                this.emergencynum = state.c__emergencynum;
            

                this.gender = state.c__gender;
               

                this.aadarnum = state.c__aadarnum;

 

 

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