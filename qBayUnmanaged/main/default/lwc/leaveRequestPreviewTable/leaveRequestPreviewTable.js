import { LightningElement, wire,api } from 'lwc';
import getLeaveRequests from '@salesforce/apex/LeaveRequestpreviewtableController.getLeaveRequests';

export default class LeaveRequestPreviewTable extends LightningElement {
    leaveRequests = [];
    @api userName;
    @wire(getLeaveRequests,{ userName: '$userName' })
    wiredLeaveRequests({ error, data }) {
        if (data) {
            this.leaveRequests = data;
        } else if (error) {
            console.error('Error fetching leave requests:', error);
        }
    }
}