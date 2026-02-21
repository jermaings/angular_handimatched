import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../profileservice';
import { RecordVideoService } from './record-video.service';

type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED';

@Component({
  selector: 'app-record-video',
  templateUrl: './record-video.component.html',
  styleUrls: ['./record-video.component.css']
})
export class RecordVideoComponent implements OnInit, AfterViewInit{
  @ViewChild('videoElement') videoElement: any;
  title = 'record-rtc-screen-demo';
  videoBlobUrl: any = null;
  video: any;
  state: RecordingState = 'NONE';
  recordType: boolean = false; // false will be video true will be canvas
  saveTitleToVideo: boolean = false;
  titleForm!: FormGroup;

  profileForm!: FormGroup;
  imagePreview: string = '';
  

  constructor(
        private videoService: RecordVideoService,
        private profileService: ProfileService,
        private ref: ChangeDetectorRef,
        private sanitizer: DomSanitizer
        ) {
    this.videoService.getMediastreamListener().subscribe((data) => {
      this.video.srcObject = data;
      this.ref.detectChanges();
    })
    this.videoService.getBlobListener().subscribe((video) => {
      console.log('blob', video);
      this.video.srcObject = null;
      this.videoBlobUrl = this.sanitizer?.bypassSecurityTrustResourceUrl(video);
      this.videoElement.srcObject
      this.ref?.detectChanges();
    })
  }
  ngOnInit(): void {
    this.titleForm = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      })
    })
    this.profileForm = new FormGroup({
      'imagePath': new FormControl(null),
    });  
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;
  }
  testRouting(file: File) {
    this.profileService.testRouting(file);
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.profileForm.patchValue({imagePath: file});
    this.profileForm.get('imagePath')!.updateValueAndValidity();
    this.testRouting(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
      }

  startRecording() {
    this.videoService.startRecording();
    this.state = 'RECORDING';
  }
  startCanvasRecording() {
    this.videoService.startCanvasRecording();
    this.state = 'RECORDING';
  }
  stopRecording() {
    this.videoService.stopRecording();
    this.state = 'RECORDED';
  }
  downloadRecording() {
    this.videoService.downloadRecording();
  }
  saveRecording(event: any) {
    event.stopPropagation();
    const title = this.titleForm?.value;
    this.videoService.saveRecording(title);
    console.log('saved recording is component')
  }
  openTitleElement() {
    if(this.saveTitleToVideo == true) {
      this.saveTitleToVideo = false;
    } else {
      this.saveTitleToVideo = true;
    }
  }
  clearRecording() {
    this.videoService.clearRecording();
    this.video.srcObject = null;
    this.videoBlobUrl = null;
    this.state = 'NONE';
  }
  setRecordingType() {
    if(!this.recordType) {
      this.recordType = true;
    } else {
      this.recordType = false;
    }
  }

}
