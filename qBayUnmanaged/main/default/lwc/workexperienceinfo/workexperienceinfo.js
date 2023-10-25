import { LightningElement, api, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAMEOFORG_FIELD from '@salesforce/schema/User__c.Name_of_the_Organization__c';

import ROLE_FIELD from '@salesforce/schema/User__c.Role__c';

import WORKDES_FIELD from '@salesforce/schema/User__c.WorkDesignation__c';

import WORKLOC_FIELD from '@salesforce/schema/User__c.Working_Location__c';


import { NavigationMixin } from 'lightning/navigation';

 

export default class employeeinfo extends NavigationMixin(LightningElement) {

    @api nameoforg;

    @api role;

    @api workdes;
    @api workloc;

  

 

    @api recordId;

    fields = {

      NAMEOFORG_FIELD: NAMEOFORG_FIELD,

      ROLE_FIELD: ROLE_FIELD,

      WORKDES_FIELD: WORKDES_FIELD,

      WORKLOC_FIELD: WORKLOC_FIELD,

    };

 

    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        if (currentPageReference) {

            const state = currentPageReference.state;

            if (state.c__nameoforg|| state.c__role|| state.c__workdes|| state.c__workloc) {

                this.nameoforg = state.c__nameoforg;
                this.role = state.c__role;

                this.workdes = state.c__workdes;

                this.workloc = state.c__workloc;

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