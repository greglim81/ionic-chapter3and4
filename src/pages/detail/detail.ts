import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { NoteService } from '../../app/note.service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class Detail {

  note;
  newNoteFlag = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NoteService, private alertCtrl: AlertController) {
    this.note = this.navParams.get('noteParam');   
    
    if(!this.note){
      this.note = {
        id: '',        
        date: '', 
        title: '',
        content: ''         
      };
      this.newNoteFlag = true;      
    }
  }

  onTrash(){
    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: `Are you sure you want to delete this note: "${this.note.title}?"`, // use back tick to insert string desc
      buttons: [
        {
          text: 'Cancel' // don't do anything when cancel   
        },
        {
          text: 'Confirm',
          handler: () => {
            this.noteService.removeNote(this.note);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  } 

  ionViewWillLeave() {
    
    if(this.note.title === "" && this.note.date === "" && this.note.content === ""){      
      // if note is blank don't do anything      
    }
    else if(this.newNoteFlag){
      this.noteService.addNote(this.note);      
    }
    else{
      
    }
  }
}
