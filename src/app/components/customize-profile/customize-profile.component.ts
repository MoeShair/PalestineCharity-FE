import {Component, OnInit} from '@angular/core';
import {ProfileService, User} from "../../pages/profile/profile.service";
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {CustomizeProfileService} from "./customize-profile.service";

@Component({
  selector: 'app-customize-profile',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    FormsModule
  ],
  templateUrl: './customize-profile.component.html',
  styleUrl: './customize-profile.component.scss'
})
export class CustomizeProfileComponent implements OnInit{
  userProfile: User | null = null
  fileList: NzUploadFile[] = [];
  userId: string | undefined = '';
  biography: string | undefined =  ''

  constructor(private profileService: ProfileService,private msg: NzMessageService,
              private http: HttpClient, private customizeService: CustomizeProfileService) {
  }
  ngOnInit() {
    this.profileService.getUSerInfo().subscribe(
      (resData) => {
        this.userProfile = resData;
        this.userId = resData?.user._id
        this.biography = resData?.user.biography
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  handlePreview = (file: NzUploadFile) => {
    this.msg.info(`Preview file: ${file.name}`);
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
      return false;
    }
    // Ensure only one file is uploaded
    this.fileList = [file];
    return true;
  };

  customRequest = (item: NzUploadXHRArgs): Subscription => {
    const formData = new FormData();
    formData.append('profilePicture', item.file as any);
    if(this.userId != undefined){
      formData.append('userId', this.userId);
    }

    return this.http.put('http://localhost:3000/posts/updateProfilePicture', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          item.onProgress?.({ percent: (event.loaded / event.total) * 100 }, item.file);
        }
      } else if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<any>;
        if (response.body && response.body.success) {
          item.onSuccess?.(response.body, item.file, event);
        } else {
          item.onError?.(new Error('Upload failed'), item.file);
        }
      }
    }, error => {
      item.onError?.(new Error('Upload failed'), item.file)
    });
  };

  customBackgroundRequest = (item: NzUploadXHRArgs): Subscription => {
    const formData = new FormData();
    formData.append('backgroundPicture', item.file as any);
    if(this.userId != undefined){
      formData.append('userId', this.userId);
    }

    return this.http.put('http://localhost:3000/posts/updateBackgroundPicture', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          item.onProgress?.({ percent: (event.loaded / event.total) * 100 }, item.file);
        }
      } else if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<any>;
        if (response.body && response.body.success) {
          item.onSuccess?.(response.body, item.file, event);
        } else {
          item.onError?.(new Error('Upload failed'), item.file);
        }
      }
    }, error => {
      item.onError?.(new Error('Upload failed'), item.file)
    });
  };

  handleChange = (info: NzUploadChangeParam) => {
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      const error = info.file.error as any;
      this.msg.error(`${info.file.name} file upload failed. ${error.message || error}`);
    }
  };
  updateBio(){
    if(this.userId && this.biography){
      console.log(this.userId)
      console.log(this.biography)
      this.customizeService.updateBiography(this.userId, this.biography).subscribe()
    }
    else{
      this.msg.error('U should never see this error')
    }
  }
}
