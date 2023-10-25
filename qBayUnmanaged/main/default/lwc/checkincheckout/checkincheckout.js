// import { LightningElement, track, wire } from 'lwc';

// import { CurrentPageReference } from 'lightning/navigation';

// import { createRecord } from 'lightning/uiRecordApi';

// import getUserInfo from '@salesforce/apex/LoginController.getUserInfo';

// import saveCheckIn from '@salesforce/apex/TimeTrackerController.saveTimeTrackerRecord';

// import saveCheckout from '@salesforce/apex/TimeTrackerController.getCheckout';

// import hasCheckInForToday from '@salesforce/apex/TimeTrackerController.hasCheckInForToday';

// import hasCheckOutForToday from '@salesforce/apex/TimeTrackerController.hasCheckOutForToday';

// import TIME_TRACKER_OBJECT from '@salesforce/schema/Time_Tracker__c';

// import START_TIME_FIELD from '@salesforce/schema/Time_Tracker__c.Start_Time__c';

// import END_TIME_FIELD from '@salesforce/schema/Time_Tracker__c.End_Time__c';


// // import NAME_FIELD from '@salesforce/schema/Time_Tracker__c.Name__c';

// import EMPLOYEE_ID from '@salesforce/schema/Time_Tracker__c.Employee_Id__c';

// import { NavigationMixin } from 'lightning/navigation';

// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

 

// export default class CheckinCheckout extends NavigationMixin(LightningElement) {


//     @track showCheckInPage = false;

//     @track isCheckInDisabled = false;

//     @track isCheckOutDisabled = false;

//     @track startTime = '';

//     @track endTime = '';

//     @track name;

//     @track username;

//     @track employeeId;

 

//     @wire(CurrentPageReference)

//     setCurrentPageReference(currentPageReference) {

//     if (currentPageReference) {

//       const state = currentPageReference.state;

//       if (state.c__name  && state.c__employeeId) {

//         this.name = state.c__name;

//         this.employeeId = state.c__employeeId;

//         this.loadUserInfo();

//         this.checkIfCheckedInToday();

//         this.checkIfCheckedOutToday();

//       }

//     }

//     // currentPageReference;

//   }

//   handleLoginSuccess() {

//     // Handle the logic when the user logs in successfully

//     // For example, show the CheckIn page and hide the login page

//     this.showCheckInPage = true;

//   }

//   loadUserInfo() {

//     getUserInfo({ username: this.name, employeeId: this.employeeId })

//     .then(result => {

//       if (result) {

//         // Assuming that 'user__c' object has a field 'Name' which contains the user's name

//         this.name = result.Name;

//         this.employeeId = result.Employee_Id__c;

//       }

//     })

//     .catch(error => {

//       console.error('Error fetching user info:', error)

//      });

//     }


//     connectedCallback() {

//       // Retrieve saved Check-In data from Local Storage
//       if (!this.isCheckInDisabled && !this.isCheckOutDisabled) {

//       const savedCheckInData = JSON.parse(localStorage.getItem('checkInData'));

//       if (savedCheckInData) {

//         this.isCheckInDisabled = savedCheckInData.isCheckInDisabled;

//         this.isCheckOutDisabled = savedCheckInData.isCheckOutDisabled;

//         this.startTime = savedCheckInData.startTime;
//         this.employeeId = savedCheckInData.employeeId;

//         this.name = savedCheckInData.name;

//         this.startTime = localStorage.getItem('startTime') || '';

//         this.endTime = localStorage.getItem('endTime') || '';


//       }
//     }
//       this.handlePageReferenceUpdate();

//     }

//     handlePageReferenceUpdate(){

//       if (this.currentPageReference && this.currentPageReference.state){

//         const { state } = this.currentPageReference;

//         this.username = state.c__username;

//         this.name = state.c__name;
//         this.employeeId = state.c__employeeId;

//         // Now, you have both the username and name passed from the login page.

//         // You can use this.username and this.name in your component as needed.

//       }

//     }

//     async checkIfCheckedInToday() {

//       try {

//         const hasCheckedIn = await hasCheckInForToday({ name: this.name, employeeId: this.employeeId });

//         if (hasCheckedIn) {

//           this.isCheckInDisabled = true;

//         } else {

//           this.isCheckInDisabled = false;

//         }

//       } catch (error) {

//         console.error('Error checking check-in for today:', error);

//       }

//     }

//     async checkIfCheckedOutToday() {

//       console.log('Inside CheckOut')

//       try {

//         const hasCheckedOut = await hasCheckOutForToday({ name: this.name,employeeId: this.employeeId });

//         if (hasCheckedOut) {

//           this.isCheckOutDisabled = true;

//         } else {

//           this.isCheckOutDisabled = false;

//         }

//       } catch (error) {

//         console.error('Error checking check-in for today:', error);

//       }

//     }

//     handleCheckIn(event) {

//       this.startTime = new Date().toLocaleString();

//       this.isCheckInDisabled = true;

//       this.isCheckOutDisabled = false;

//       /*if (event.target.label === 'name') {

//         this.name = event.target.value;

//         console.log('inside');

//       }*/

//       saveCheckIn({ name: this.name, employeeId: this.employeeId })

//       .then(() => {

//         this.checkIfCheckedInToday();

//         localStorage.setItem('startTime', this.startTime);
//               // Show success toast message
//               const toastEvent = new ShowToastEvent({
//                   title: 'Check-In Successful',
//                   message: `Nice to see you again, ${this.name}😎 .`,
//                   variant: 'success',
//               });
//               this.dispatchEvent(toastEvent);

//       })

//       .catch((error) => {

//         console.error('Error during check-in:', error);
//         // localStorage.removeItem('checkInData');

//       });

//       const checkInData = {

//         isCheckInDisabled: this.isCheckInDisabled,

//         isCheckOutDisabled: this.isCheckOutDisabled,

//         startTime: this.startTime,

//         name: this.name,
//        employeeId: this.employeeId

//     };

//       localStorage.setItem('checkInData', JSON.stringify(checkInData));

//     }

//     handleCheckOut(event) {

//       this.endTime = new Date().toLocaleString();
      
//       this.isCheckOutDisabled = true;

//       // if (event.target.label === 'name') {

//       //   this.name = event.target.value;

//       //   console.log('inside');

//       // }

//       // this.createTimeTrackerRecord();

//       saveCheckout({ name: this.name, employeeId: this.employeeId })

//       .then(() => {

//         this.checkIfCheckedOutToday();

//         localStorage.setItem('endTime', this.endTime);
//          // Show success toast message
//          const toastEvent = new ShowToastEvent({
//           title: 'Check-Out Successful',
//           message: `See you later BYE ${this.name}😇`,
//           variant: 'success',
//       });
//       this.dispatchEvent(toastEvent);

//       })

//       .catch((error) => {

//         console.error('Error during check-out:', error);

//          localStorage.removeItem('checkOutData');

//       });

//       const checkOutData = {

//         isCheckInDisabled: this.isCheckInDisabled,

//         isCheckOutDisabled: this.isCheckOutDisabled,

//         endTime: this.endTime,

//         name: this.name,
//        employeeId: this.employeeId

//     };
//     localStorage.setItem('checkOutData', JSON.stringify(checkOutData));

//     }

//     async createTimeTrackerRecord() {

//       const fields = {};

//       fields[START_TIME_FIELD.fieldApiName] = this.startTime;

//       fields[END_TIME_FIELD.fieldApiName] = this.endTime;

//       fields[NAME_FIELD.fieldApiName] = this.name;

//       fields[EMPLOYEE_ID.fieldApiName] = this.employeeId;

//       const recordInput = { apiName: TIME_TRACKER_OBJECT.objectApiName, fields };

//       try {

//         const createdRecord = await createRecord(recordInput);

//         console.log('Created record Id: ' + createdRecord.id);

//         // Optionally, you can show a success toast or perform other actions here.

//       } catch (error) {

//         console.error('Error creating record:', error);

//         // Optionally, you can show an error toast or perform other error handling here.

//       } finally {

//         // Reset values after successful save or error

//         this.startTime = '';

//         this.endTime = '';

//         this.isCheckInDisabled = true;

//         this.isCheckOutDisabled = true;

//       }

//     }

//     handleSave() {
//       // Perform any validation or data processing if needed
  
//       // Call the Apex method to update the related record
//       saveUser({
//           name: this.name,
//           employeeId: this.employeeId,
//           // Include other fields as needed for the update
//       })
//       .then(() => {
//           // Handle success
//           this.dispatchEvent(
//               new ShowToastEvent({
//                   title: 'Success',
//                   message: 'User record updated successfully.',
//                   variant: 'success',
//               })
//           );
  
//           // Reset form or perform other actions
//           this.name = '';
//           this.employeeId = '';
//       })
//       .catch((error) => {
//           console.error('Error during user record update:', error);
//       });
//   }

//   }


import { LightningElement, track, api,wire } from 'lwc';
import updateTestRecord from '@salesforce/apex/TimeTrackerController.updateTestRecord';
import { CurrentPageReference } from 'lightning/navigation';

import { createRecord } from 'lightning/uiRecordApi';

import getUserInfo from '@salesforce/apex/LoginController.getUserInfo';
import TIME_TRACKER_OBJECT from '@salesforce/schema/Time_Tracker__c';

import START_TIME_FIELD from '@salesforce/schema/Time_Tracker__c.Start_Time__c';

import END_TIME_FIELD from '@salesforce/schema/Time_Tracker__c.End_Time__c';

// import NAME_FIELD from '@salesforce/schema/Time_Tracker__c.Name__c';

import EMPLOYEE_ID from '@salesforce/schema/Time_Tracker__c.Employee_Id__c';

import { NavigationMixin } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CheckInCheckOutComponent extends LightningElement {
    @track isCheckIn = true;
    @track isCheckOut = false;
    @track name = '';
    @track startTime = '';
    @track endTime = '';
    @track employeeId = '';


    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
    if (currentPageReference) {
      const state = currentPageReference.state;
      if (state.c__name  && state.c__employeeId) {
        this.name = state.c__name;
        this.employeeId = state.c__employeeId;
        this.loadUserInfo();
    
      }
    }
    // currentPageReference;
  }

   handleLoginSuccess() {

    // Handle the logic when the user logs in successfully

    // For example, show the CheckIn page and hide the login page

    this.showCheckInPage = true;

  }

  loadUserInfo() {

    getUserInfo({ username: this.name, employeeId: this.employeeId })

    .then(result => {

      if (result) {

        // Assuming that 'user__c' object has a field 'Name' which contains the user's name

        this.name = result.Name;

        this.employeeId = result.Employee_Id__c;

      }

    })

    .catch(error => {

      console.error('Error fetching user info:', error)

     });

    }
 
//     connectedCallback() {

//       // Retrieve saved Check-In data from Local Storage
//       if (!this.isCheckInDisabled && !this.isCheckOutDisabled) {

//       const savedCheckInData = JSON.parse(localStorage.getItem('checkInData'));

//       if (savedCheckInData) {

//         this.isCheckInDisabled = savedCheckInData.isCheckInDisabled;

//         this.isCheckOutDisabled = savedCheckInData.isCheckOutDisabled;

//         this.startTime = savedCheckInData.startTime;
//         this.employeeId = savedCheckInData.employeeId;

//         this.name = savedCheckInData.name;

//         this.startTime = localStorage.getItem('startTime') || '';

//         this.endTime = localStorage.getItem('endTime') || '';


//       }
//     }
//       this.handlePageReferenceUpdate();

//     }






    async createTimeTrackerRecord() {

      const fields = {};

      fields[START_TIME_FIELD.fieldApiName] = this.startTime;

      fields[END_TIME_FIELD.fieldApiName] = this.endTime;

      fields[NAME_FIELD.fieldApiName] = this.name;

      fields[EMPLOYEE_ID.fieldApiName] = this.employeeId;

      const recordInput = { apiName: TIME_TRACKER_OBJECT.objectApiName, fields };

      try {

        const createdRecord = await createRecord(recordInput);

        console.log('Created record Id: ' + createdRecord.id);

        // Optionally, you can show a success toast or perform other actions here.

      } catch (error) {

        console.error('Error creating record:', error);

        // Optionally, you can show an error toast or perform other error handling here.

      } finally {

        // Reset values after successful save or error

        this.startTime = '';

        this.endTime = '';

        this.isCheckInDisabled = true;

        this.isCheckOutDisabled = true;

      }

    }

    handleSave() {
      // Perform any validation or data processing if needed
  
      // Call the Apex method to update the related record
      saveUser({
          name: this.name,
          employeeId: this.employeeId,
          // Include other fields as needed for the update
      })
      .then(() => {
          // Handle success
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success',
                  message: 'User record updated successfully.',
                  variant: 'success',
              })
          );
  
          // Reset form or perform other actions
          this.name = '';
          this.employeeId = '';
      })
      .catch((error) => {
          console.error('Error during user record update:', error);
      });
  }
















    @api recordId; // Make sure to pass the recordId from the parent component or record page.

    get buttonLabel() {
        return this.isCheckIn ? 'Check-In' : 'Check-Out';
    }

    get buttonDisabled() {
        return this.isCheckIn ? !this.name : !this.startTime;
    }

    toggleCheckInOut() {
        if (this.isCheckIn) {
            this.startTime = new Date().toISOString();
            
        } else {
            this.endTime = new Date().toISOString();
            this.updateRecord();
        }
        this.isCheckIn = !this.isCheckIn;
        this.isCheckOut = !this.isCheckOut;
    }

    updateRecord() {
        updateTestRecord({ recordId: this.recordId, startTime: this.startTime, endTime: this.endTime, name: this.name, employeeId: this.employeeId })
            .then(result => {
                // Handle the response if needed
            })
            .catch(error => {
                // Handle any errors
            });
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }
}
