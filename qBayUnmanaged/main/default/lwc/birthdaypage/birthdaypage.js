import { LightningElement, wire } from 'lwc';
import getEmployeeBirthdaysByMonth from '@salesforce/apex/EmployeeController.getEmployeeBirthdaysByMonth';

export default class EmployeeBirthdayList extends LightningElement {
    employeeData = [];

    @wire(getEmployeeBirthdaysByMonth, { month: new Date().getMonth() + 1 })
    wiredEmployeeData({ error, data }) {
        if (data) {
            console.log('Data received:', data);
            this.employeeData = data.map(employee => ({
                ...employee,
                formattedDateOfBirth: new Date(employee.Date_Of_Birth__c).toLocaleDateString('en-GB')
                .replace(/\//g, '-') // Replace slashes with hyphens
            }));
        }
        else if (error) {
            console.error('Error loading data:', error);
    }
}
}