import { PostsService } from './../../services/post.service';
import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  post: Post = {
    message: '',
    coords: null,
    position: false
  };

  loadingGeo = false;


  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) { }

  async crearPost() {
    const createPost = await this.postService.createPost(this.post);

    if (createPost) {
      this.post = {
        message: '',
        coords: null,
        position: false
      };

      this.tempImages = [];
      this.route.navigateByUrl('main/tabs/tab1');
    }
  }

  getGeo() {
    console.log(this.post);
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }
    this.loadingGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingGeo = false;
      // resp.coords.latitude
      // resp.coords.longitude
      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.post.coords = coords;
    }).catch((error) => {
      this.loadingGeo = false;

    });
  }

  launchCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);

  }

  launchGallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImage(options);

  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postService.uploadImage(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

}
