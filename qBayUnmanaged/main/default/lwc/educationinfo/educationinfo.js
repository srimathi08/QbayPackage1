import { LightningElement, api, wire } from 'lwc';

 

import { CurrentPageReference } from 'lightning/navigation';

 

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

 

import TENTH_STREAM from '@salesforce/schema/User__c.X10th_Stream__c';

 

import TENTHTH_PERCENTAGE from '@salesforce/schema/User__c.X10th__c';

 

import TWELVETH_STREAM from '@salesforce/schema/User__c.X12th_Stream__c';

 

import TWELVETH_PERCENTAGE from '@salesforce/schema/User__c.X12th_Percentage__c';

 

import UG_DEGREE from '@salesforce/schema/User__c.UG_Degree__c';

 

import UG_PERCENTAGE from '@salesforce/schema/User__c.UGPercentage__c';

 

import PG_DEGREE from '@salesforce/schema/User__c.PG_Degree__c';

 

import PG_PERCENTAGE from '@salesforce/schema/User__c.PG_Percentage__c';

 

import { NavigationMixin } from 'lightning/navigation';

 

 

 

export default class MyTimeSheet extends NavigationMixin(LightningElement) {

 

 

  @api tenthstm;

   @api tenthst;

  @api twelvethstm;

  @api twelvestr;

  @api ugdeg;

  @api ugper;

  @api pgdeg;

   @api pgper;

   

 

    fields = {

 

      TENTH_STREAM : TENTH_STREAM,

 

      TENTHTH_PERCENTAGE: TENTHTH_PERCENTAGE,

 

      TWELVETH_STREAM: TWELVETH_STREAM,

 

      TWELVETH_PERCENTAGE: TWELVETH_PERCENTAGE,

 

      UG_DEGREE: UG_DEGREE,

 

      UG_PERCENTAGE: UG_PERCENTAGE,

 

      PG_DEGREE: PG_DEGREE,

 

      PG_PERCENTAGE: PG_PERCENTAGE,

 

    };

 

 

 

    @wire(CurrentPageReference)

 

    setCurrentPageReference(currentPageReference) {

 

        if (currentPageReference) {

 

            const state = currentPageReference.state;

 

            if (state.c__tenthstm|| state.c__tenthst || state.c__twelvethstm || state.c__twelvestr || state.c__ugdeg || state.c__ugper || state.c__pgdeg || state.c__pgper) {

              this.tenthst = state.c__tenthst;

              this.tenthstm = state.c__tenthstm;

              this.twelvethstm = state.c__twelvethstm;

              this.twelvestr = state.c__twelvestr;

              this.ugdeg = state.c__ugdeg;

              this.ugper = state.c__ugper;

              this.pgdeg = state.c__pgdeg;

              this.pgper = state.c__pgper;

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