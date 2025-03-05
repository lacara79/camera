# Exemplo de Camera Ionic, Angular

## Instalação da Camera
> npm install @capacitor/camera
> npx cap sync


## Instalação do PWA

Alguns plugins do Capacitor, como Camera ou Toast, têm UI baseada na web disponível quando não estão sendo executados nativamente. Por exemplo, chamar Camera.getPhoto() carregará uma experiência de captura de fotos responsiva ao ser executado na web.

> npm install @ionic/pwa-elements

Após a instalação é necessário configurar o arquivo **main.ts**

> import { defineCustomElements } from '@ionic/pwa-elements/loader'; <br>
> defineCustomElements(window); <br>
> if (environment.production) { <br>
>  enableProdMode(); <br>
> } <br>

## Meu Exemplo

Em meu exemplo eu configurei para registrar a foto, aparecer na tela do app, e realizar o upload usando PHP.


## Uploado

Você pode configurar como achar mais interessante, mas eu criei um arquivo e compartilhei aqui. 
As primeiras linhas são para resolver os problemas chatos rss do CORS

Espero ter colaborado.
