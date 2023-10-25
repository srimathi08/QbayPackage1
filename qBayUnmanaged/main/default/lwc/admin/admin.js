// myComponent.js
import { LightningElement, track } from 'lwc';
import getRecords from '@salesforce/apex/LwcSearchFilterCtrl.getRecords';

export default class MyComponent extends LightningElement {
    @track objectName = '';
    @track name = '';
    @track startDate;
    @track endDate;
    @track employeeid='';
    @track records = [];
    columns = this.getColumnsBasedOnObject(this.objectName);

    objectOptions = [
        { label: 'Time Tracker', value: 'Time_Tracker__c' },
        { label: 'Timesheet', value: 'Timesheet__c' },
        { label: 'Leave Request', value: 'Leave_Request__c' },
    ];

    getColumnsBasedOnObject(objectName) {
        if (objectName === 'Time_Tracker__c') {
            return [
                { label: 'Name', fieldName: 'Name__c' },
                {label:'Employee Id', fieldName:'Employee_Id__c'},
                { label: 'Start Time', fieldName: 'Start_Time__c' },
                { label: 'End Time', fieldName: 'End_Time__c' },
                { label: 'Total Hours', fieldName: 'Total_Hours__c' },
                { label: 'Created Date', fieldName: 'CreatedDate' }
            ];
        } else if (objectName === 'Timesheet__c') {
            return [

                { label: 'Name', fieldName: 'Name__c' },
                {label:'Employee Id', fieldName:'Employee_Id__c'},
                { label: 'Project Name', fieldName: 'Project_Name__c' },
                { label: 'Total Hours', fieldName: 'Total_Hours__c' },
                { label: 'Date', fieldName: 'Date__c', type:'date'},
                { label: 'Work Done', fieldName: 'Work_Done__c' },
                { label: 'Created Date', fieldName: 'CreatedDate' }
            ];
        } else if (objectName === 'Leave_Request__c') {
            return [

                { label: 'Name', fieldName: 'Name__c' },
                {label:'Employee Id', fieldName:'Employee_Id__c'},
                { label: 'Leave Type', fieldName: 'Leave_Type__c' },
                { label: 'Leave Count', fieldName: 'Leave_Count__c' },
                { label: 'Reason for Leave', fieldName: 'Reason_for_Leave__c' },
                { label: 'Remaining Leave', fieldName: 'Remaining_Leave__c' },
                { label: 'Created Date', fieldName: 'CreatedDate' }
            ];
        }
    }

    handleObjectChange(event) {
        this.objectName = event.target.value;
        this.columns = this.getColumnsBasedOnObject(this.objectName);
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleemployeeidChange(event)
    {
        this.employeeid=event.target.value;
    }

    handleDateChange(event){
        this.startDate=event.target.value;
    }
    handledateEnd(event){
        this.endDate=event.target.value;
        console.log(this.endDate);
    }
    handleSearch() {
        getRecords({ objectName:this.objectName, name:this.name, employeeid:this.employeeid ,startDate:this.startDate,endDate:this.endDate})
            .then(result => {
                this.records = result;
                console.log(this.records);
            })
            .catch(error => {
                // Handle error
            });

        }

    handleDownload() {
        let csvContent = '';
        const columns = this.columns.map(col => col.fieldName);
        csvContent += columns.join(',') + '\n';

        this.records.forEach(record => {
            let row = [];
            columns.forEach(col => {
                row.push(record[col]);
            });
            csvContent += row.join(',') + '\n';
        });

        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'records.csv';
        hiddenElement.click();
    }
}