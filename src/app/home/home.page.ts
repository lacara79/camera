import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,IonFooter, IonCol,IonRow, IonGrid} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NgIf, IonFooter, IonCol,IonRow, IonGrid],
})
export class HomePage {
  public photo: string | undefined;

  constructor(private http: HttpClient) {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Retorna a imagem como base64
        source: CameraSource.Camera // Usa a câmera (pode mudar para Photos para galeria)
      });

      this.photo = image.dataUrl; // Armazena a imagem para exibição
      console.log('Foto capturada:', this.photo);
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  }
  
  async uploadPhoto() {
    if (!this.photo) {
      console.error('Nenhuma foto para enviar');
      return;
    }

    // Exemplo de envio para um servidor (substitua a URL pelo seu endpoint)
    const serverUrl = 'http://localhost/photo/upload.php';
    const blob = this.dataURLtoBlob(this.photo);

    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');

    try {
      const response = await this.http.post(serverUrl, formData).toPromise();
      console.log('Upload bem-sucedido:', response);
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  }

  // Função auxiliar para converter base64 em Blob
  private dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
