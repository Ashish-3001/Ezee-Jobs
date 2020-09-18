import { Component, OnInit } from '@angular/core';
import { GetService } from '../servvices/get.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {

  job_id:any;
  details:any = {};
  postdata:any = {};
  Editchangd:boolean = false;

  constructor(private get:GetService,
    private http:HttpClient,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {

    this.postdata = {
      eyer_id: "",
      eyer_name:"",
      eyer_location: "",
      eyer_number: "",
      job_post: "",
      job_salary: "",
      job_experience: "",
      job_employment: "",
      job_gender: "",
      job_age: "",
      job_education: "",
      job_working_days: "",
      job_skills: "",
      job_language: "",
      job_working_shifts: "",
      job_benefits: "",
      job_posted_by: "",
      job_posted_designation: "",
      job_discription: "",
    }

    this.job_id = this.get.Job_Id.value;
    this.http.get(`http://tekhab.pythonanywhere.com/JobPost/${this.job_id}`).subscribe( (data) => {
      this.details = data;
    });
  }

  onEdit(form: NgForm) {
    this.postdata.eyer_id = this.details.eyer_id;
    this.postdata.eyer_name = this.details.eyer_name;
    this.postdata.eyer_location = this.details.eyer_location;
    this.postdata.eyer_number = this.details.eyer_number;
    this.postdata.job_post = this.details.job_post;
    if(form.value.salary) {
      this.postdata.job_salary = form.value.salary;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_salary = this.details.job_salary;
    }
    if(form.value.previousExperience) {
      this.postdata.job_experience = form.value.previousExperience;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_experience = this.details.job_experience;
    }
    if(form.value.employment) {
      this.postdata.job_employment = form.value.employment;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_employment = this.details.job_employment;
    }
    if(form.value.gender) {
      this.postdata.job_gender = form.value.gender;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_gender = this.details.job_gender;
    }
    if(form.value.age) {
      this.postdata.job_age = form.value.age;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_age = this.details.job_age;
      this.Editchangd = true;
    }
    if(form.value.education) {
      this.postdata.job_education = form.value.education;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_education = this.details.job_education;
    }
    if(form.value.workingDays) {
      this.postdata.job_working_days = form.value.workingDays;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_working_days = this.details.job_working_days;
    }
    if(form.value.additionalSkills) {
      this.postdata.job_skills = form.value.additionalSkills;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_skills = this.details.job_skills;
    }
    if(form.value.language.toString()) {
      this.postdata.job_language = form.value.language.toString();
      this.Editchangd = true;
    }
    else {
      this.postdata.job_language = this.details.job_language;
    }
    if(form.value.Shift) {
      this.postdata.job_working_shifts = form.value.Shift;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_working_shifts = this.details.job_working_shifts;
    }
    if(form.value.perksBenefits.toString()) {
      this.postdata.job_benefits = form.value.perksBenefits.toString();
      this.Editchangd = true;
    }
    else {
      this.postdata.job_benefits = this.details.job_benefits;
    }
    if(form.value.employerName) {
      this.postdata.job_posted_by = form.value.employerName;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_posted_by = this.details.job_posted_by;
    }
    if(form.value.employerDesignation) {
      this.postdata.job_posted_designation = form.value.employerDesignation;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_posted_designation = this.details.job_posted_designation;
    }
    if(form.value.jobDescription) {
      this.postdata.job_discription = form.value.jobDescription;
      this.Editchangd = true;
    }
    else {
      this.postdata.job_discription = this.details.job_discription;
    }
    if(this.Editchangd == true) {
      this.http.patch(`http://tekhab.pythonanywhere.com/JobPost/${this.job_id}/`, this.postdata).subscribe( () => {
        this.router.navigate(['/employer-profile/employer-home/menu/apllication-status/',this.job_id]);
      }, (error) => {
        console.log(error);
        this.presentAlertEditMistake();
      });
    }
  }

  async presentAlertEditMistake() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sorry !!',
      message: "Something went wronge <strong>Please Try Again</strong>",
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }
}
