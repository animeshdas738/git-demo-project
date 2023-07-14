import { LightningElement, track } from 'lwc';
import fetchData from  '@salesforce/apex/TableComponentController.getOpportunitysByLoggedInUser';

export default class TableTestCmp extends LightningElement {

    @track objectName = 'Opportunity';
    @track tableHeaders = [{label : "Name", type : "TEXT", name : "Name", issortable : true, isFirstCol : true, colWidth : 20, isEditable : true}, 
                    {label : "Account Id", type : "TEXT", name : "AccountId", issortable : false, isFirstCol : false, colWidth : 20, isEditable : true},
                    {label : "Close Date", type : "DATE", name : "CloseDate", issortable : true, isFirstCol : false, colWidth : 20, isEditable : true},
                    {label : "Amount", type : "DECIMAL", name : "Amount", issortable : true, isFirstCol : false, colWidth : 20, isEditable : false},
                    {label : "Active", type : "BOOLEAN", name : "IsActive__c", issortable : false, isFirstCol : false, colWidth : 20, isEditable : true}];
    @track tableData = [];

    get fieldstr(){
        let fieldstr = '';
        let index = 0;
        this.tableHeaders.map((field) => {
            fieldstr = fieldstr + (index===0? '' : ',') + field.name;
            index++;
        });
        return fieldstr;
    }

    connectedCallback(){
        console.log('Fetching data....');
        console.log('this.fieldstr' + this.fieldstr);
        fetchData({fields : this.fieldstr})
        .then(result => {
            console.log('Oppty list:::' + JSON.stringify(result));
            this.tableData = [...result];
        })
        .catch(error => {
            
        });
    }

}