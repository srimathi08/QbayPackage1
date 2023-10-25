import { LightningElement, track } from 'lwc';
import saveRecord from '@salesforce/apex/FoodDetailsController.saveFoodDetails'; // Replace with your Apex method
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const MAX_FILE_SIZE = 100000000; // 10mb

export default class FoodDetailsUploader extends LightningElement {
    @track name;
    @track designation;
    @track travelDateFrom;
    @track travelDateTo;
    @track cost;
    @track purpose;
    @track empId;
    @track foodDetails={};
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

    onTravelDateFromChange(event) {
        this.travelDateFrom = event.detail.value;
    }

    onTravelDateToChange(event) {
        this.travelDateTo = event.detail.value;
    }

    onCostChange(event) {
        this.cost = event.detail.value;
    }

    onPurposeChange(event) {
        this.purpose = event.detail.value;
    }

    onFileUpload(event) {
        if (event.target.files.length > 0) {
            this.uploadedFiles = event.target.files;
            this.fileName = event.target.files[0].name;
            this.file = this.uploadedFiles[0];
            if (this.file.size > MAX_FILE_SIZE) {
                alert("File Size Cannot exceed " + MAX_FILE_SIZE);
            }
        }
    }


    saveFoodDetails() {
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
        var foodDetails = {
            'sobjectType': 'Food_Details__c',
            'Name': this.name,
            'Id__c':this.empId,
            'Designation__c': this.designation,
            'Travel_Date_from__c': this.travelDateFrom,
            'Travel_Date_to__c': this.travelDateTo,
            'Cost__c': this.cost,
            'Purpose__c': this.purpose
        };
        saveRecord({
            foodDetailsRec: foodDetails,
            file: encodeURIComponent(this.fileContents),
            fileName: this.fileName
        })
        .then(result => {

            if (result) {

                this.foodDetails = result; // Update foodDetails with the saved record
            const event = new ShowToastEvent({
                title: 'Travel Details Added',
                message: 'Travel Details ' + this.foodDetails.Name + ' created.',
                variant: 'success'
            });
            this.dispatchEvent(event);

              // Clear input fields

              this.template.querySelectorAll('lightning-input').forEach(input => {
                input.value = '';
            });

            this.template.querySelectorAll('lightning-textarea').forEach(input => {
                input.value = '';
            });

            // You can add similar code for other types of input fields as needed
        }
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title : 'Error',
                    message : 'Kindly fill all the details',
                    variant : 'error'
                });
                this.dispatchEvent(event);
            });
    }
}