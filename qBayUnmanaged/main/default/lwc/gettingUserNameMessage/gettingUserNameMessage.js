import { LightningElement,wire } from 'lwc';
import{getRecord, getFieldValue} from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User__c.Name';
import EMPLOYEE_ID_FIELD from '@salesforce/schema/User__c.Employee_Id__c';
import DATE_OF_BIRTH from '@salesforce/schema/User__c.Date_Of_Birth__c';
import DATE_OF_JOINING from '@salesforce/schema/User__c.Date_Of_Joining__c';
import DESIGNATION from '@salesforce/schema/User__c.Designation__c';
import EMAIL from '@salesforce/schema/User__c.Email__c';
import ROLE from '@salesforce/schema/User__c.Role__c';
import DRIVERLICENCE from '@salesforce/schema/User__c.Driver_s_License_Number__c';
import LICENCEEXPDATE from '@salesforce/schema/User__c.License_Expiry_Date__c';
// import SSNNUMBER from '@salesforce/schema/User__c.SSN_Number__c';
// import SINNUMBER from '@salesforce/schema/User__c.SIN_Number__c';
import NATIONALITY from '@salesforce/schema/User__c.Nationality__c';
import STATUS from '@salesforce/schema/User__c.Status__c';



const fields = [NAME_FIELD, EMPLOYEE_ID_FIELD, DATE_OF_BIRTH, DATE_OF_JOINING, DESIGNATION, EMAIL, ROLE, DRIVERLICENCE, LICENCEEXPDATE,  NATIONALITY, STATUS ];

export default class GettingUserNameMessage extends LightningElement {
    userId =Id;

    @wire (getRecord, {recordId: '$userId', fields})
    user;
 
    get name(){
        return getFieldValue(this.user.data, NAME_FIELD );
    }

    get employeeId() {
        return getFieldValue(this.user.data, EMPLOYEE_ID_FIELD); // Retrieve the Employee ID field value
    }

    get dateofbirth() {
        return getFieldValue(this.user.data, DATE_OF_BIRTH); // Retrieve the Employee ID field value
    }

    get dateofjoining() {
        return getFieldValue(this.user.data,DATE_OF_JOINING ); // Retrieve the Employee ID field value
    }

    get designation() {
        return getFieldValue(this.user.data,DESIGNATION ); // Retrieve the Employee ID field value
    }

    get email() {
        return getFieldValue(this.user.data, EMAIL); // Retrieve the Employee ID field value
    }

    get role() {
        return getFieldValue(this.user.data, ROLE); // Retrieve the Employee ID field value
    }

    get driverlicencenumber() {
        return getFieldValue(this.user.data, DRIVERLICENCE); // Retrieve the Employee ID field value
    }
    get licenceexpirydate() {
        return getFieldValue(this.user.data, LICENCEEXPDATE); // Retrieve the Employee ID field value
    }
    // get ssnnumber() {
    //     return getFieldValue(this.user.data, SSNNUMBER); // Retrieve the Employee ID field value
    // }
    // get sinnumber() {
    //     return getFieldValue(this.user.data, SINNUMBER); // Retrieve the Employee ID field value
    // }
    get nationality() {
        return getFieldValue(this.user.data, NATIONALITY); // Retrieve the Employee ID field value
    }

    get status(){
        return getFieldValue(this.user.data, STATUS);
    }   

}