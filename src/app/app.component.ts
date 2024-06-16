import { Component } from '@angular/core';
import { BarcodegenService } from './components/barcodegen.service';
import { FormBuilder } from '@angular/forms';
import { BarCodeRepresentation } from './components/Module/barcode-representation';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  barCodes: Array<any> = [];
  barCodeObj:BarCodeRepresentation = {};
  data: any = {};
  imageData: any; 

  constructor(
    private barcodegenService: BarcodegenService,
  ) { }

  generateExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.barCodes);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'partNumbers.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  title = 'barcode';

  ngOnInit(): void {
    this.GetLastBarCode();
  }

  SaveBarCode(): void {
    console.log("ABC");
    this.barcodegenService.createBarCode(this.barCodeObj).subscribe({
      next: (result): void => {
        console.log(result);
        this.GetLastBarCode();  
      }
    });
  }

  GetLastBarCode(){
    this.barcodegenService.GetLastBarCode().subscribe(allData=>{
      this.barCodes = allData.data.dataList;  
    })
  }

  getImageUrl(codeImg: string): string {
    return 'data:image/png;base64,' + codeImg;
  }


}
