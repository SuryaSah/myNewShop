import { Injectable } from '@angular/core';
import { Http , Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/delay';
import { Iitem } from './rawMaterial';



@Injectable()
export class RawMaterialService {
	item:Iitem[] = [];
	private _productUrl = '/api/rawSilver';
	private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
	constructor(private _http:Http){}
	 handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
	getRawSilver() : Observable<Iitem[]> {
		return this._http.get(this._productUrl)
        	.map((response:Response)=> <Iitem[]> response.json())
        	.catch(this.handleError);
	}
	getRawItem(page:number) : Observable<Iitem[]> {
		console.log("page is",page);
		return this._http.post('/api/rawSilverPagination',{page:page},{headers: this.headers})
        	.map((response:Response)=> <Iitem[]> response.json())
        	.catch(this.handleError);
	}
	addRawSilver(kachiNo:string,weightInGram:number,purity:number):Observable<Iitem>{
    	let deducted:number = 0.50;
    	if(purity<=50){
    		deducted = 1.0;
    	}
    	let deductedPurity = purity - deducted;
		return this._http.post(this._productUrl, {
			kachiNo : kachiNo,
			weightInGram : weightInGram,
			purity : purity,
			deduction : deducted,
			deductedPurity : deductedPurity,
			silverInGram : weightInGram * deductedPurity/100 
		})
        .map((response: Response) => {
            return <Iitem>response.json();
        }).catch(this.handleError); 
	}
	referalCode(length):string {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for(let i=0;i<length;i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	deleteTableRow(id:any){
		console.log("id is",this._productUrl+id);
		return this._http.delete(this._productUrl+"/"+id,{headers: this.headers})
				   .map((response: Response) => {
            			return response.json();
        		   }).catch(this.handleError); 
	}
	updateWeight(weight,silverInGram,id){
		return this._http.put(this._productUrl+"/"+id, {weight: weight,silverInGram:silverInGram})
				.map((response: Response) => {
            			return response.json();
        		   }).catch(this.handleError); 
	}
	print(object){
		return this._http.post("/api/rawSilverBill",object)
				.map((response: Response) => {
            			return response.json();
        		   }).catch(this.handleError);
	}
	deleteAll(){
		return this._http.delete("/api/rawSilverDeleteAll",{headers: this.headers})
				.map((response: Response) => {
            			return response.json();
        		   }).catch(this.handleError);
	}
}