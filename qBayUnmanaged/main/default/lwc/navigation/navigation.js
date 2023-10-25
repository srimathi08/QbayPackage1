import { LightningElement } from 'lwc';
import{ NavigationMixin } from 'lightning/navigation';

export default class NavigationserviceDemo  extends NavigationMixin(LightningElement) {


    handelbuttonclick(){
        this[NavigationMixin.Navigate ]({
            type : 'standard__navItemPage',
            attributes :{
                apiName : 'Checkinpage'
                        }
        })
    }

}