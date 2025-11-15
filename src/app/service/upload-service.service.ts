import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  getSignature() {
    return this.http.get<any>('http://localhost:8080/api/cloudinary/signature');
  }

  uploadVideo(file: File, signatureData: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signatureData.apiKey);
    formData.append('timestamp', signatureData.timestamp);
    formData.append('signature', signatureData.signature);

    return this.http.post(`https://api.cloudinary.com/v1_1/${signatureData.cloudName}/video/upload`, formData);
  }

  deleteVideo(publicId: string): Observable<any> {
    return this.http.delete('http://localhost:8080/api/cloudinary/delete', {
      params: {publicId}
    });
  }
}
