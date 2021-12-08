import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {Provider} from 'react-redux'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['uz', 'ru', 'en'],
    fallbackLng: "uz",
    detection: {
      order: ['cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
});

const loadingMarkup = (
  <div style={{display: 'flex', textAlign: 'center', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
    <p>Loading...</p>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={loadingMarkup}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);