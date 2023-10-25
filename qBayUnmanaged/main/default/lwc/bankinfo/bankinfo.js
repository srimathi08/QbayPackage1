import { LightningElement, api, wire } from 'lwc';

 

import { CurrentPageReference } from 'lightning/navigation';

 

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

 

import BANK_NAME from '@salesforce/schema/User__c.Bank_Name__c';

 

import ACCOUNT_NUMBER from '@salesforce/schema/User__c.Account_Number__c';

 

import IFSC_CODE from '@salesforce/schema/User__c.IFSC_Number__c';

 

import BANK_ADDRESS from '@salesforce/schema/User__c.Bank_Details__c';

 

 

import { NavigationMixin } from 'lightning/navigation';

 

 

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

 

    @api bankname;

 

    @api acnum;

 

    @api ifscnum;

    @api bankAdd;

 

    fields = {

 

      BANK_NAME : BANK_NAME ,

 

      ACCOUNT_NUMBER : ACCOUNT_NUMBER ,

 

      IFSC_CODE : IFSC_CODE ,

 

      BANK_ADDRESS: BANK_ADDRESS,

 

    };

 

 

 

    @wire(CurrentPageReference)

 

    setCurrentPageReference(currentPageReference) {

 

        if (currentPageReference) {

 

            const state = currentPageReference.state;

 

            if (state.c__bankname|| state.c__acnum|| state.c__ifscnum || state.c__bankAdd) {

 

                this.bankname =state.c__bankname;

                this.acnum = state.c__acnum;

 

                this.ifscnum =  state.c__ifscnum ;

                this.bankAdd = state.c__bankAdd;

 

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