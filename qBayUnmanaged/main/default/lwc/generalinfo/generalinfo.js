import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import GENDER_FIELD from '@salesforce/schema/User__c.Gender__c';

import BLOODTYPE_FIELD from '@salesforce/schema/User__c.Blood_Type__c';

import AADHARNUM_FIELD from '@salesforce/schema/User__c.Aadhar_Card_Number__c';

import PANNUM_FIELD from '@salesforce/schema/User__c.P_PAN_Number__c';


import { NavigationMixin } from 'lightning/navigation';

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

    @api gender;
    @api bloodtype;
    @api aadarnum;
    @api pannum;

    @api recordId;

    fields = {

      GENDER_FIELD: GENDER_FIELD,

      BLOODTYPE_FIELD: BLOODTYPE_FIELD,

      AADHARNUM_FIELD: AADHARNUM_FIELD,

      PANNUM_FIELD: PANNUM_FIELD,

    };

 

    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        if (currentPageReference) {

            const state = currentPageReference.state;

            if (state.c__gender|| state.c__bloodtype|| state.c__aadarnum || state.c__pannum) {

                this.gender = state.c__gender;
        
                this.bloodtype = state.c__bloodtype;
                this.aadarnum = state.c__aadarnum;

                this.pannum  = state.c__pannum;
               

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