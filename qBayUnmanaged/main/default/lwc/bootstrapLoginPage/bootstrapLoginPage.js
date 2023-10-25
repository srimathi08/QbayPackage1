import { LightningElement, track, api } from 'lwc';

import Qbaylogo from '@salesforce/resourceUrl/Qbaylogo';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import checkCredentials from '@salesforce/apex/LoginController.checkCredentials';

import getUserInfo from '@salesforce/apex/LoginController.getUserInfo';

import { NavigationMixin } from 'lightning/navigation';

export default class BootstrapLoginPage extends NavigationMixin(LightningElement)  {

    //from sris org

   

    @track username = '';
    @track password = '';
    @track error = '';
    @api Qbaylogo = Qbaylogo;
    @track employeeId;
    @track designation;
    @track role;
    @track email;
    @track dataofjoining;
    @track dateofbirth;
    @track driverlicencenumber;
    @track licenceexpirydate;
    @track ssnnumber;
    @track sinnumber;
    @track nationality;
    @track uannumber;
    @track gender;
    @track mobile;
    @track emergencynum;
    @track aadarnum;
    @track tenthstm;
    @track tenthst;
    @track twelvethstm;
    @track twelvestr;
    @track ugdeg;
    @track ugper;
    @track pgdeg;
    @track pgper;
    @track bankname;
    @track acnum;
    @track ifscnum;
    @track bankAdd;
    
    @track pannum;
    @track fathername;
    @track mothername;
    @track nameoforg;
    @track workdes;
    @track workloc;
    @track bloodtype;
    @track passnum;
    @track passvalidtill;
    @track workpermit;

    
    @track street;
    @track city;
    @track state;
    @track postalCode;
    @track country;
    @track isSecondComponentVisible = false; // Initialize as false
    @track isFirstComponentVisible = true; // Boolean flag to control visibility
   

    canvas;

    ctx;

    particles = [];

    mouseX;

    mouseY;

 

    renderedCallback() {

        if (this.canvas) {

            return; // Prevent multiple renders

        }

 

        this.canvas = this.template.querySelector("canvas");

        this.canvas.height = window.innerHeight;

        this.canvas.width = window.innerWidth;

        this.ctx = this.canvas.getContext("2d");

 

        // Initialize the particles and start the animation

        this.init();

        this.draw();

 

        // Add a mousemove event listener

        this.canvas.addEventListener("mousemove", (e) => {

            this.mouseX = e.clientX;

            this.mouseY = e.clientY;

            setTimeout(() => {

                if (this.mouseX === e.clientX && this.mouseY === e.clientY) {

                    for (let i = 0; i < this.particles.length; i += 1) {

                        let x = this.particles[i].x;

                        let y = this.particles[i].y;

                        const x1 = e.clientX;

                        const y1 = e.clientY;

                        const dist = this.getDist(x, y, x1, y1);

 

                        if (dist < 200) {

                            if (x < x1) {

                                x -= 2;

                            } else {

                                x += 2;

                            }

                            if (y < y1) {

                                y -= 2;

                            } else {

                                y += 2;

                            }

                        }

                        this.particles[i].x = x;

                        this.particles[i].y = y;

                    }

                }

            }, 10);

        });

 

        // Add a setInterval to update neighbors

        setInterval(() => {

            const copy = [...this.particles];

            for (let i = 0; i < this.particles.length; i += 1) {

                const x = this.particles[i].x;

                const y = this.particles[i].y;

 

                copy.sort((a, b) => {

                    const x1 = a.x;

                    const x2 = b.x;

                    const y1 = a.y;

                    const y2 = b.y;

                    const dist1 = this.getDist(x, y, x1, y1);

                    const dist2 = this.getDist(x, y, x2, y2);

                    return dist1 - dist2;

                });

 

                this.particles[i].neighbors = copy.slice(0, 10);

            }

        }, 250);

    }

 

    getDist(x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    }

 

    init() {

        for (let i = 0; i < 300; i += 1) {

            const x = Math.floor(Math.random() * this.canvas.width);

            const y = Math.floor(Math.random() * this.canvas.height);

            const speedX = Math.random();

            const speedY = Math.random();

            const dirX = Math.random() > 0.5 ? 1 : -1;

            const dirY = Math.random() > 0.5 ? 1 : -1;

 

            this.particles.push({

                x,

                y,

                speedX: dirX * speedX,

                speedY: dirY * speedY,

                neighbors: [],

            });

        }

    }

 

    draw() {

        this.ctx.fillStyle = "rgba(0,0,0,0.5)";

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#b1c900";

        this.ctx.strokeStyle = "rgba(255,255,255,0.1)";

        for (let i = 0; i < this.particles.length; i += 1) {

            let x = this.particles[i].x + this.particles[i].speedX;

            let y = this.particles[i].y + this.particles[i].speedY;

            if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {

                x = Math.floor(Math.random() * this.canvas.width);

                y = Math.floor(Math.random() * this.canvas.height);

            }

 

            const x1 = this.mouseX || 2000;

            const y1 = this.mouseY || 2000;

            const dist = this.getDist(x, y, x1, y1);

            if (dist < 200) {

                if (x < x1) {

                    x -= 2;

                } else {

                    x += 2;

                }

                if (y < y1) {

                    y -= 2;

                } else {

                    y += 2;

                }

            }

 

            this.ctx.moveTo(x, y);

            this.ctx.arc(x, y, 2, 0, Math.PI * 2);

            this.particles[i].x = x;

            this.particles[i].y = y;

        }

        this.ctx.fill();

 

        for (let i = 0; i < this.particles.length; i += 1) {

            const x = this.particles[i].x;

            const y = this.particles[i].y;

            const neighbors = this.particles[i].neighbors;

            for (let j = 0; j < neighbors.length; j += 1) {

                const x1 = neighbors[j].x;

                const y1 = neighbors[j].y;

                const dist = this.getDist(x, y, x1, y1);

                if (dist < 100) {

                    this.ctx.beginPath();

                    this.ctx.moveTo(x, y);

                    this.ctx.lineTo(x1, y1);

                    this.ctx.stroke();

                }

            }

        }

        requestAnimationFrame(this.draw.bind(this));

    }

 

 

 

    //Sris code----------------------------------------------------------------------

    handleUsernameChange(event) {
        this.username = event.target.value;
    }
    handlePasswordChange(event) {
        this.password = event.target.value;

    }
    handleLogin() {
        // Call the Apex method to check credentials
        checkCredentials({ username: this.username, password: this.password })
            .then(result => {
                if (result) {
     // Credentials are valid, fetch user info and navigate to the home page
                    this.fetchUserInfo();
                } else {
                    // Credentials are invalid, show error message
                    this.error = 'Invalid username or password.';
                }
            })
            .catch(error => {
                // Handle any error that occurred during Apex call
                console.error('Error: ' + error);
                this.showToast('Error', 'An error occurred while processing the request.', 'error');
            });

            
        // Set the property to true to render the second component.
        this.isSecondComponentVisible = true;
         // Set isFirstComponentVisible to false after navigating
         this.isFirstComponentVisible = false;
    }
    fetchUserInfo() {
        console.log('username valied'+this.username);
        getUserInfo({ username: this.username })
            .then(result => {
                console.log(result)
                if (result) {
                    // Assuming that 'user__c' object has a field 'Name' which contains the user's name
                    // console.log('results'+result);
                    const name = result.Name;
                    // console.log('Inide seconloginpage infoe')
                    const employeeId = result.Employee_Id__c;
                    // console.log('employeeId'+result)
                    const designation = result.Designation__c;
                    const role = result.Role__c;
                    // console.log('employeeId'+result.Role__c)
                    const email = result.Email__c;
                
                    const dateofbirth = result.Date_Of_Birth__c;
                    const gender = result.Gender__c;
                  
                    const emergencynum = result.Emergency_Contact__c;
                    const mobile = result.P_Mobile__c;
                    const aadarnum = result.Aadhar_Card_Number__c;
                    const tenthstm = result.X10th_Stream__c;
                    const tenthst = result.X10th__c;
                    const twelvethstm = result.X12th_Stream__c;
                    const twelvestr = result.X12th_Percentage__c;
                    const ugdeg = result.UG_Degree__c;
                    const ugper = result.UGPercentage__c;
                    const pgdeg = result.PG_Degree__c;
                    const pgper = result.PG_Percentage__c;
                    const bankname = result.Bank_Name__c;
                    const acnum = result.Account_Number__c;
                    const ifscnum = result.IFSC_Number__c;
                    const bankAdd = result.Bank_Details__c;
                    
                     const pannum = result.P_PAN_Number__c;
                    const mothername = result.Mother_s_Name__c;
                    const fathername = result.Father_s_Name__c;
                    const nameoforg = result.Name_of_the_Organization__c;
                    const workdes = result.WorkDesignation__c;
                    const workloc = result.Working_Location__c;
                    const bloodtype = result.Blood_Type__c;
                    const passnum = result.Passport_Number__c;
                    const passvalidtill = result.Passport_Valid_Till__c;
                    const workpermit = result.Work_Permit__c;
                    const street = result.Present_Address__Street__s;
                    const city = result.Present_Address__City__s;                  
                    const state = result.Present_Address__StateCode__s;
                   const postalCode = result.Present_Address__PostalCode__s;
                   const country = result.Present_Address__CountryCode__s;
                    const recordId =result.id;

                    this.navigateToHomePage(name, employeeId, designation, role, email,  dateofbirth,gender, mobile, emergencynum, aadarnum ,tenthstm,tenthst,twelvethstm,twelvestr,ugdeg,ugper,pgdeg,pgper,bankname,acnum,ifscnum,bankAdd,pannum,mothername,fathername,nameoforg,workdes,workloc,bloodtype,passnum,passvalidtill,workpermit,street,city,state,postalCode,country);

 

                }
            })
            .catch(error => {
  console.error('Error fetching user info:', error);
            });
    }
    
    handlesignup(){
        alert("Hi Your in sign-up page")
    }


 

    navigateToOnboardingPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__app',
            attributes: {
               appTarget:'c__Onboarding_Process',
                apiName: 'Onboarding Form'
            },
            state: {
       
            }
        });
    }

 







    // navigateToHomePage(name, employeeId, designation, role, email,  dateofbirth, gender,mobile, emergencynum, aadarnum ,tenthstm,tenthst,twelvethstm,twelvestr,ugdeg,ugper,pgdeg,pgper,bankname,acnum,ifscnum,bankAdd,pannum,mothername,fathername,nameoforg,workdes,workloc,bloodtype,passnum,passvalidtill,workpermit,street,city,state,postalCode,country) {

    //     this[NavigationMixin.Navigate]({

    //         type: 'standard__navItemPage',

    //         attributes: {

    //             apiName: 'QBPortal'

    //         },

    //         state: {
             
    //             c__name: name,// Pass the user's name to the home page

    //             c__employeeId: employeeId,
    //             c__designation: designation,
               
    //             c__role: role,
    //             c__email:email,
    //             c__dateofbirth:dateofbirth,
    //             c__gender:gender,
              
    //             c__mobile:mobile,
    //             c__emergencynum:emergencynum,
    //             c__aadarnum:aadarnum,
    //             c__tenthstm:tenthstm,
    //             c__tenthst:tenthst,
    //             c__twelvethstm:twelvethstm,
    //             c__twelvestr:twelvestr,
    //             c__ugdeg:ugdeg,
    //             c__ugper:ugper,
    //             c__pgdeg:pgdeg,
    //             c__pgper:pgper,
    //             c__bankname:bankname,
    //             c__acnum:acnum,
    //             c__ifscnum:ifscnum,
    //             c__bankAdd:bankAdd,
    //             c__pannum:pannum,
    //             c__fathername:fathername,
    //             c__mothername:mothername,
    //             c__nameoforg:nameoforg,
    //             c__workdes:workdes,
    //             c__workloc:workloc,
    //             c__bloodtype:bloodtype,
    //             c__passnum:passnum,
    //             c__passvalidtill:passvalidtill,
    //             c__workpermit:workpermit,
    //             c__street:street,
    //             c__city:city,
    //             c__state:state,
    //             c__postalCode:postalCode,
    //             c__country:country           

    //         }
    //     });
      
    // }

    showToast(title, message, variant) {

 

        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}