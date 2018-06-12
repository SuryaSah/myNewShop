import { Component, OnInit,Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iitem } from './rawMaterial';
import { RawMaterialService } from './rawMaterial.service';
@Component({
    templateUrl: 'rawMaterial.component.html',
    providers: [ RawMaterialService ]
})
export class RawMaterialComponent implements OnInit {
	complexForm : FormGroup;
    p: number = 1;
    itemPerPage:number = 7;
    total: number;
    loading: boolean;

	kachiNo:string;
	weightInGram:number;
	purity:number;
	totalWeight:number;
	totalSilver:number;
	totalCash:number;
	customerName:string;
	customerMobile:number;
	rawMaterial:Iitem[] = [];
	statusMessage:string;
	purityPattern = "^([0-9]{0,2})+(?:\.[0-9]{0,2})$";
	weightInGramPattern ="^(?:[0-9]+(?:\.[0-9]{0,2})?)?$";
	constructor(private fb: FormBuilder,private _rawMaterial:RawMaterialService){
		this.complexForm = fb.group({
			'kachiNo': [null, Validators.compose([Validators.required,Validators.pattern("[A-za-z0-9]*") ])],
			'weightInGram': [null, Validators.compose([Validators.required,Validators.pattern(this.weightInGramPattern) ])],
			'purity': [null, Validators.compose([Validators.required,Validators.pattern(this.purityPattern) ])]
		});
	

	}

	ngOnInit() { 
		//this.getRawSilver();
		 this.getPage(1);
		 console.log("page details is",this.getPage(1));
	}
	 getPage(page: number) {
        this.loading = true;
        console.log("page is",page);
        this._rawMaterial.getRawItem(page)
        .subscribe(data => {
        	this.rawMaterial=data.details;
        	//this.total = data.totalRecords;
            //this.p = data.page;
            this.loading = false;
            //this.totalWeight = this.getTotalWeight(this.rawMaterial);
        	//this.totalSilver = this.getTotalSilver(this.rawMaterial);
        },
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
        });
    }
	getRawSilver() {
		this._rawMaterial.getRawSilver()
        .subscribe(data => {
        	this.rawMaterial=data;
        	//this.totalWeight = this.getTotalWeight(this.rawMaterial);
        	//this.totalSilver = this.getTotalSilver(this.rawMaterial);
        },
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
        });
	}
	addRawSilver(form:any){
		this._rawMaterial.addRawSilver(form.kachiNo,form.weightInGram,form.purity)
		.subscribe( data => {
			let page = Math.floor(this.total/this.itemPerPage)+1;
			if(this.total >= this.itemPerPage && page > this.p){
				this.getPage(page);
				console.log("next page data is",this.rawMaterial);
			}
			else {
				this.getPage(this.p);
				console.log("current page data is",this.rawMaterial);
			}
			//this.totalWeight = this.getTotalWeight(this.rawMaterial);
			//this.totalSilver = this.getTotalSilver(this.rawMaterial);
		},
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
        });
	}
	getTotalWeight(data):number{
		let total = 0;
		for(let i in data){
		    total = total + data[i].weightInGram;
		}
		return total;
	}
	getTotalSilver(data):number {
		let total = 0;
		for(let i in data){
			total = total + data[i].silverInGram;
		}
		return total;
	}
	printBill(){
			console.log("refreal code is",this._rawMaterial.referalCode(6));
	}
	delteRow(id:any){
		this._rawMaterial.deleteTableRow(id)
		.subscribe( data => {
			//this.getRawSilver();
			this.getPage(this.p);
		},
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
        });
	}
	changeWeight(event,id){
		this.rawMaterial.forEach(data=> {
			if(data._id === id) {
				let silverInGram = event.target.outerText * data.deductedPurity /100;
				this._rawMaterial.updateWeight(event.target.outerText,silverInGram,id)
				.subscribe( data => {
					this.getRawSilver();
				},
		        error => {
		            this.statusMessage =
		                'Problem with the service. Please try again after sometime'
		        });
			}
		})
	}
	print() 
	{
		let customerName = this.customerName;
		let customerMobile = this.customerMobile;
		let object = {
			"customerName" : customerName,
			"mobileNo" : customerMobile,
			"rawSilverDetails" : this.rawMaterial,
			"totalWeight" : this.totalWeight,
			"totalSilver" : this.totalSilver
		}
		console.log("object is",object);
		this._rawMaterial.print(object)
		.subscribe( data => {
			console.log("succesfully submited");
			this._rawMaterial.deleteAll()
			.subscribe( data => {
				console.log("succesfully deleted");
				this.getRawSilver();
			},
	        error => {
	            this.statusMessage =
	                'Problem with the service. Please try again after sometime'
	        });
		},
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
        });

		/* let content = document.getElementById('rawMaterialTable').innerHTML;
		let myWindow = window.open('','customer-invoice');
		myWindow.document.write('<html><head><title>Customer invoice</title>');
		myWindow.document.write('<link rel="stylesheet" src="./assets/style.css" type="text/css" media="print" />');
		myWindow.document.write('</head><body>');
		myWindow.document.write('<header><h1>Invoice</h1><address contenteditable>'+
		'<p>onathan Neal</p><p>101 E. Chapman Ave<br>Orange, CA 92866</p>'+
		'<p>(800) 555-1234</p></address></header>');
		myWindow.document.write('<p>Customer Name:<span>'+customerName+'</span></p>');
		myWindow.document.write('<p>Mobile Name:<span>'+customerMobile+'</span></p>');
		myWindow.document.write(content);
		// myWindow.document.write('<img src="./assets/images/logo.png" />');
		myWindow.document.write('<style>'+
								'h1 { font: bold 100% sans-serif; letter-spacing:'+ '0.5em; text-align: center; text-transform:'+ 'uppercase; }'+
								'table {'+
    								'font-family: arial, sans-serif;'+
   									 'border-collapse: collapse;width: 100%;}'+
									 'td, th {'+
									 'border: 1px solid #dddddd;'+
									 'text-align: left;'+
									 'padding: 8px;}'+
									 '</style>');
		myWindow.document.write('</body></html');
		myWindow.print();
		// myWindow.close();	*/
	}
}