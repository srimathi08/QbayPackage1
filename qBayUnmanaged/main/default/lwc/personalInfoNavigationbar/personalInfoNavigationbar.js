import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class PersonalInfoNavigationbar extends NavigationMixin(LightningElement) {

  //component hiding 
  @track showemployeeinfo = true;
  @track showeducationinfo = false;
  @track showworkexperienceinfo = false;
  @track showpassportinfo = false;
  @track showefamilyinfo = false;
  @track showbankinfo = false;
  @track showgeneralinfo = false;

@track componentVisibility = {
    showemployeeinfo: true,
     showeducationinfo : false,
    showworkexperienceinfo:  false,
 showpassportinfo :  false,
  showefamilyinfo :  false,
  showbankinfo :  false,
   showgeneralinfo :  false
};




loadStateFromLocalStorage() {

    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedState) {

        const {showemployeeinfo} = JSON.parse(storedState);

        this.showemployeeinfo = showemployeeinfo;

        // this.showleavetracker = showleavetracker;

        this. showeducationinfo = showeducationinfo;
        this.showworkexperienceinfo = showworkexperienceinfo;
        this.showpassportinfo = showpassportinfo;
        this.showefamilyinfo =  showefamilyinfo;
        this.showbankinfo =  showbankinfo;
        this. showgeneralinfo =  showgeneralinfo;

    }

}
   saveStateToLocalStorage() {

        const stateToStore = {
    
            showemployeeinfo: this.showemployeeinfo,
    
            showeducationinfo: this.showeducationinfo,
    
            showworkexperienceinfo: this.showworkexperienceinfo,
            showpassportinfo: this.showpassportinfo,
            showefamilyinfo: this.showefamilyinfo,
           showbankinfo: this.showbankinfo,
           showgeneralinfo: this.showgeneralinfo 
    
        };
    
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
    
    }



    employeeinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=true;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = false;
        this.showefamilyinfo = false;
        this.showbankinfo=false;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    educationinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=true;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = false;
        this.showefamilyinfo = false;
        this.showbankinfo=false;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    workexperienceinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= true;
        this.showpassportinfo = false;
        this.showefamilyinfo = false;
        this.showbankinfo=false;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    passportinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = true;
        this.showefamilyinfo = false;
        this.showbankinfo=false;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    familyinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = false;
        this.showefamilyinfo = true;
        this.showbankinfo=false;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    bankinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = false;
        this.showefamilyinfo = false;
        this.showbankinfo=true;
            this. showgeneralinfo=false;
        this.saveStateToLocalStorage();
    }


    
    generalinfo(){
        // this.showcheckincheckout=!this.showcheckincheckout;
        this.showemployeeinfo=false;
        this.showeducationinfo=false;
        this.showworkexperienceinfo= false;
        this.showpassportinfo = false;
        this.showefamilyinfo = false;
        this.showbankinfo=false;
            this. showgeneralinfo=true;
        this.saveStateToLocalStorage();
    }

}