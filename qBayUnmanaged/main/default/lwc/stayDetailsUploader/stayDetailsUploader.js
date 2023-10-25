import { LightningElement, track } from 'lwc';
import saveStayDetails from '@salesforce/apex/FoodDetailsController.saveStayDetails';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const MAX_FILE_SIZE = 100000000; // 10mb

export default class StayDetailsUploader extends NavigationMixin(LightningElement) {
    @track name;
    @track empId;
    @track designation;
    @track purpose;
    @track travelDateFrom;
    @track travelDateTo;
    @track costs;
    @track stayDetails={};


    uploadedFiles = [];

    file;
    fileContents;
    fileReader;
    content;
    fileName;

    onNameChange(event) {
        this.name = event.detail.value;
    }

    onIdChange(event) {
        this.empId = event.detail.value;
    }
    onDesignationChange(event) {
        this.designation = event.detail.value;
    }

    onPurposeChange(event) {
        this.purpose = event.detail.value;
    }

    onTravelDateFromChange(event) {
        this.travelDateFrom = event.detail.value;
    }

    onTravelDateToChange(event) {
        this.travelDateTo = event.detail.value;
    }

    onCostsChange(event) {
        this.costs = event.detail.value;
    }

    onFileUpload(event) {
        if (event.target.files.length > 0) {
            this.uploadedFiles = event.target.files;
            this.fileName = event.target.files[0].name;
            this.file = this.uploadedFiles[0];
            if (this.file.size > MAX_FILE_SIZE) {
                alert("File Size Can not exceed " + MAX_FILE_SIZE);
            }
        }
    }

    saveStayDetails() {
        this.fileReader = new FileReader();
        this.fileReader.onloadend = () => {
            this.fileContents = this.fileReader.result;
            let base64 = 'base64,';
            this.content = this.fileContents.indexOf(base64) + base64.length;
            this.fileContents = this.fileContents.substring(this.content);
            this.saveRecord();
        };
        this.fileReader.readAsDataURL(this.file);
    }

    saveRecord() {
        var stayDetails = {
            'sobjectType': 'Stay_Details__c',
            'Name': this.name,
            'Id__c':this.empId,
            'Designation__c': this.designation,
            'Purpose__c': this.purpose,
            'Travel_date_from__c': this.travelDateFrom,
            'Travel_date_to__c': this.travelDateTo,
            'Cost__c': this.costs
        };

        saveStayDetails({
            stayRec: stayDetails,
            file: encodeURIComponent(this.fileContents),
            fileName: this.fileName
        })
        .then(result => {
            if (result) {
                this.stayDetails = result; // Update foodDetails with the saved record
            const event = new ShowToastEvent({
                            title: 'Success',
                            variant: 'success',
                            message: 'Stay Details Successfully created',
                        });
            this.dispatchEvent(event);
            this.template.querySelectorAll('lightning-input').forEach(input=>{
                input.value='';
                });
                this.template.querySelectorAll('lightning-textarea').forEach(input=>{
                    input.value='';
                    });

                    // this[NavigationMixin.Navigate]({
                    //     type: 'standard__recordPage',
                    //     attributes: {
                    //         recordId: stayId,
                    //         objectApiName: 'Stay_Details__c',
                    //         actionName: 'view'
                    //     },
                    // });

                }
            })
            .catch(error => {
                console.log('error ', error);
            });
    }
}