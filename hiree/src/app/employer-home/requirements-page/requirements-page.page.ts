import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/servvices/post.service';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/servvices/authentication.service';



@Component({
  selector: 'app-requirements-page',
  templateUrl: './requirements-page.page.html',
  styleUrls: ['./requirements-page.page.scss'],
})
export class RequirementsPagePage implements OnInit {
  eyer_id: any;
  eyer_name: any;
  eyer_location: any;
  eyer_number: any;
  total_job_post: any;
  active_job_post: any;

  constructor(private postdata:PostService ,public menuCtrl: MenuController,private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.data.then((value) => {
      console.log(value);
      this.eyer_id = value.id;
      this.eyer_name = value.eyer_hotel_name;
      this.eyer_location = value.eyer_address_2;
      this.eyer_number = value.eyer_phone;
      this.total_job_post = value.eyer_tot_no_job_post;
      this.active_job_post = value.eyer_active_job_post;
    });
  }


  onSubmit(form: NgForm) {

    var postdata = {
      eyer_id: this.eyer_id,
      eyer_name:this.eyer_name,
      eyer_location: this.eyer_location,
      eyer_number: this.eyer_number,
      job_post: form.value.post.toString(),
      job_salary: form.value.salary,
      job_experience: form.value.previousExperience,
      job_employment: form.value.employment,
      job_gender: form.value.gender,
      job_age: form.value.age,
      job_education: form.value.education,
      job_working_days: form.value.workingDays,
      job_skills: form.value.additionalSkills,
      job_language: form.value.language.toString(),
      job_working_shifts: form.value.Shift,
      job_benefits: form.value.perksBenefits.toString(),
      job_posted_by: form.value.employerName,
      job_posted_designation: form.value.employerDesignation,
      job_discription:form.value.jobDescription,
    }
  this.postdata.post_job_post(postdata, this.total_job_post, this.eyer_id, this.active_job_post);
  
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}