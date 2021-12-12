sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageStrip', 'sap/ui/core/library',
	"sap/m/MessageToast"
], function (Controller,JSONModel,MessageToast) {
	"use strict";

		return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
 
	        onInit : function(){
			this.allUsers={Users:[{"name":"Dhivya","mobile":"1234567890","date":"01-08-1998"},
			{"name":"Sumathi","mobile":"1234456789","date":"03-03-1975"}],
			newUser:{"name":"","mobile":"","date":""}};

			this.nameValid=true;
			this.dateValid=true;
			this.mobileValid=true;
			
            var oJSONModel = new JSONModel(this.allUsers);
			this.getView().setModel(oJSONModel);

			},
        
	       onNameChange: function(oEvent){
			  let inputName=oEvent.getParameter("value");
			  if(!/[^a-z ]/i.test(inputName) && inputName.length<=10)
			  {
				 // console.log(this.AllUsers.newUser);
				  this.allUsers.newUser.name=inputName;
				  console.log(this.allUsers.newUser.name);
				  oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
				  this.nameValid=true;
			  }else{
				//MessageToast.show("Enter valid name with less than 10 chars");
				oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
				this.nameValid=false;
			  }
			  
		   },
			onMobileChange : function(oEvent){
				let inputNumber=oEvent.getParameter("value");
				if(/^\d{10}$/.test(inputNumber))
				{
					this.allUsers.newUser.mobile=inputNumber;
					oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
					this.mobileValid=true;
				}else{
					oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
					this.mobileValid=false;
				}
				
			},
			onDateChange : function(oEvent){
				let calcAge=(dob)=> {
					let dateparts = dob.split("-");
					let userday = dateparts[0];
					let usermonth = dateparts[1];
					let useryear = dateparts[2];

					let d = new Date();
					let curday = d.getDate();
					let curmonth = d.getMonth() + 1; 
					let curyear = d.getFullYear();

					if((curmonth < usermonth) || ( (curmonth == usermonth) && (curday < userday)))
						var age = curyear - useryear - 1;
					else
						var age = curyear - useryear;

					return age;
				}

				let dateInput=oEvent.getParameter("value");
				let age=calcAge(dateInput);
				if(age>=18){
				this.allUsers.newUser.date=dateInput;
				oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
				this.dateValid=true;
			    }else{
					oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
					this.dateValid=false;
				}

			},

			onBindingChange: function(oEvent) {
				this.getView().byId("myTable").setVisibleRowCount(oEvent.getSource().getLength());
			},


			onSubmit:  function(){
                if(this.allUsers.Users.length ==5){
					this.allUsers.Users.shift();
				}
				
				if(this.nameValid && this.mobileValid && this.dateValid)
                {   console.log(this.allUsers.newUser);
					const addUser={
						name:this.allUsers.newUser.name,
						mobile:this.allUsers.newUser.mobile,
						date:this.allUsers.newUser.date
					}
					this.allUsers.Users.push(addUser);
				    console.log(this.allUsers);		
				
                this.resetForm();
		    	}
				
			},

			resetForm: function(){
				this.allUsers.newUser.name="";
				this.allUsers.newUser.mobile="" ;
				this.allUsers.newUser.date="";
				var oJSONModel = new JSONModel(this.allUsers);
			    this.getView().setModel(oJSONModel);
                
			},



			
		
	});

});