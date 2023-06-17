import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emplopee-info',
  templateUrl: './emplopee-info.component.html',
  styleUrls: ['./emplopee-info.component.scss'],
})
export class EmplopeeInfoComponent implements OnChanges, OnInit {
  profileForm!: FormGroup;
  employeeList: any = [];
  employeeListDup: any = [];
  edit = false;
  editId: any;
  submitted = false;
  deleteId!: number;
  term:any


  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', Validators.required],
    });

    this.getData();
  }

  closeModal(){
    this.edit = false;
  }

  getData() {
    this.http.get('http://localhost:3000/employee').subscribe((res: any) => {
      this.employeeList = res;
      this.employeeListDup = res;
    });
  }

  addEmployee() {
    this.submitted = true;
    this.edit = false;
    const id = this.employeeList[this.employeeList.length - 1].id + 1;
    if (this.profileForm.valid) {
      let payload = {
        name: this.profileForm.value.name,
        department: this.profileForm.value.department.toLowerCase(),
        salary: this.profileForm.value.salary,
        id: id,
      };
      this.http
        .post('http://localhost:3000/employee', payload)
        .subscribe((res: any) => {
          this.getData();
          this.profileForm.reset();
          document.getElementById('modalClose')?.click();
          this.submitted = false;
        });
    }
  }

  deleteDetails(id: number) {
    this.deleteId = id
   
  }

  updateEmployee(data: any) {
    this.edit = true;
    this.profileForm.patchValue(data);
    this.editId = data.id;
  }

  editData() {
    this.submitted = true;
    if (this.profileForm.valid) {
      let payload = {
        name: this.profileForm.value.name,
        department: this.profileForm.value.department.toLowerCase(),
        salary: this.profileForm.value.salary,
      };
      this.http
        .put(`http://localhost:3000/employee/${this.editId}`, payload)
        .subscribe((res) => {
          this.getData();
          this.profileForm.reset();
          document.getElementById('modalClose')?.click();
          this.submitted = false;
        });
    }
  }

  deleteThroughModal(){
    this.http.delete(`http://localhost:3000/employee/${this.deleteId}`).subscribe((res: any) => {
      this.getData();
      document.getElementById("closeDeleteModal")?.click();
    });
  }

  departmentFilter(event:any){
    this.employeeList = this.employeeListDup;
    if(event.target.value === "frontend"){
      this.employeeList = this.employeeList.filter((ele:any) => ele.department === "frontend" )
    }
    else{
      this.employeeList = this.employeeList.filter((ele:any) => ele.department === "backend" )
    }
    
  }
  salaryFilter(event:any){
    if(event.target.value == "l-h"){
      this.employeeList = this.employeeList.sort((a:any, b:any) => a.salary - b.salary);
    }
    else{
      this.employeeList = this.employeeList.sort((a:any, b:any) => b.salary - a.salary);
    }
  }
}
