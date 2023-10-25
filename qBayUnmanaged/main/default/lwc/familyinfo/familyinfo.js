import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FATHERNAME_FIELD from '@salesforce/schema/User__c.Father_s_Name__c';

import MOTHERNAME_FIELD from '@salesforce/schema/User__c.Mother_s_Name__c';

import MARITALSTATUS_FIELD from '@salesforce/schema/User__c.Marital_Status__c';

import PRESENTADDRESS_FIELD from '@salesforce/schema/User__c.Present_Address__c';


import { NavigationMixin } from 'lightning/navigation';

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

    @api fathername;
    @api mothername;
    @api martinalstatus;
    @api presentaddress;

    @api street;
    @api city;
    @api state;
    @api postalCode;
    @api country;

    @api recordId;

    fields = {

      FATHERNAME_FIELD: FATHERNAME_FIELD,

      MOTHERNAME_FIELD: MOTHERNAME_FIELD,

      MARITALSTATUS_FIELD: MARITALSTATUS_FIELD,

      PRESENTADDRESS_FIELD: PRESENTADDRESS_FIELD,

    };

 

    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        if (currentPageReference) {

            const state = currentPageReference.state;

            if (state.c__fathername|| state.c__mothername|| state.c__martinalstatus || state.c__presentaddress) {

                this.fathername = state.c__fathername;
        
                this.mothername = state.c__mothername;

                this.martinalstatus  = state.c__martinalstatus;

                 this.presentaddress = state.c__presentaddress;
                 console.log("Address" + presentaddress);

        

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