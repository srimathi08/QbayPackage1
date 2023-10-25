import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import PASSNUM_FIELD from '@salesforce/schema/User__c.Passport_Number__c';

import PASSVALIDTILL_FIELD from '@salesforce/schema/User__c.Passport_Valid_Till__c';

import WORKPERMIT_FIELD from '@salesforce/schema/User__c.Work_Permit__c';




import { NavigationMixin } from 'lightning/navigation';

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

    @api passnum;
    @api passvalidtill;
    @api workpermit;
  

 

    @api recordId;

    fields = {

        PASSNUM_FIELD: PASSNUM_FIELD,

        PASSVALIDTILL_FIELD: PASSVALIDTILL_FIELD,

        WORKPERMIT_FIELD: WORKPERMIT_FIELD,

    };

 

    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        if (currentPageReference) {

            const state = currentPageReference.state;

            if (state.c__passnum|| state.c__passvalidtill|| state.c__workpermit) {

                this.passnum = state.c__passnum;
                this.passvalidtill = state.c__passvalidtill;

                this.workpermit = state.c__workpermit;


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