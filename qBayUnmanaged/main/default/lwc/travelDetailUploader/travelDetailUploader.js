import { LightningElement, track ,wire} from 'lwc';
import saveRecord from '@salesforce/apex/FoodDetailsController.saveTravelDetail';
import getModeOfTravelPicklistValues from '@salesforce/apex/FoodDetailsController.getModeOfTravelPicklistValues';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const MAX_FILE_SIZE = 100000000; // 10mb

export default class TravelDetailUploader extends NavigationMixin(LightningElement) {
    @track name;
    @track employeeId;
    @track designation;
    @track purpose;
    @track travelDateFrom;
    @track travelDateTo;
    @track modeOfTravel;
    @track travelFromAddress;
    @track travelToAddress;
    @track cost;
    @track accompanyingperson;
    @track modeOfTravelOptions = []; // To store picklist values
    @track travelDetail={};


    @wire(getModeOfTravelPicklistValues)
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.modeOfTravelOptions = data.map(item => ({
                label: item,
                value: item
            }));
        }
    }

  
      

      
    uploadedFiles = [];
    file;
    fileContents;
    fileReader;
    content;
    fileName;

    onNameChange(event) {
        this.name = event.detail.value;
    }

    onEmployeeIdChange(event) {
        this.employeeId = event.detail.value;
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

   // Handle picklist change
   handleModeOfTravelChange(event) {
    this.modeOfTravel = event.detail.value;
}

    onTravelFromAddressChange(event) {
        this.travelFromAddress = event.detail.value;
    }

    onTravelToAddressChange(event) {
        this.travelToAddress = event.detail.value;
    }

    onAccompanyPersonChange(event) {
        this.accompanyingperson = event.detail.value;
    }

    onCostsChange(event) {
        this.cost = event.detail.value;
    }

    onFileUpload(event) {
        if (event.target.files.length > 0) {
            this.uploadedFiles = event.target.files;
            this.fileName = event.target.files[0].name;
            this.file = this.uploadedFiles[0];
            if (this.file.size > MAX_FILE_SIZE) {
                alert('File Size Cannot exceed ' + MAX_FILE_SIZE);
            }
        }
    }

    saveTravelDetail() {
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
        const travelDetail = {
            sobjectType: 'Travel_Detail__c',
            Name: this.name,
            Employee_id__c: this.employeeId,
            Designation__c: this.designation,
            Purpose__c: this.purpose,
            Travel_date_from__c: this.travelDateFrom,
            Travel_date_to__c: this.travelDateTo,
            Mode_of_travel__c: this.modeOfTravel,
            Travel_from_address__c: this.travelFromAddress,
            Travels_to_address__c: this.travelToAddress,
            Cost__c: this.cost,
            Accompanying_Person__c: this.accompanyingperson
        };

        saveRecord({
            travelDetailRec: travelDetail,
            file: encodeURIComponent(this.fileContents),
            fileName: this.fileName
        })
            // .then(travelDetailId => {
            //     if (travelDetailId) {
                .then(result =>{
                    if(result){
                        this.travelDetail=result;
                        const event=new ShowToastEvent({
                            title: 'Success',
                            variant: 'success',
                            message: 'Travel Detail Successfully created',
                        });
                    // this[NavigationMixin.Navigate]({
                    //     type: 'standard__recordPage',
                    //     attributes: {
                    //         recordId: travelDetailId,
                    //         objectApiName: 'Travel_Detail__c',
                    //         actionName: 'view',
                    //     },
                    this.dispatchEvent(event);

                    this.template.querySelectorAll('lightning-input').forEach(input =>{
                        input.value="";
                    });
                    this.template.querySelectorAll('lightning-textarea').forEach(input =>{
                        input.value="";
                    });
                    this.template.querySelectorAll('lightning-combobox').forEach(input =>{
                        input.value="";
                    });
                }
            })
            .catch(error => {
                            const event = new ShowToastEvent({
                                title : 'Error',
                                message : 'Kindly fill all the fields',
                                variant : 'error'
                            });
                            this.dispatchEvent(event);
                        });
    }
}