import { createGlobalStyle } from 'styled-components';

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: Nunito-Light;
    font-weight: 300;
    src: url(chrome-extension://${chrome.runtime.id}/fonts/Nunito-Light.ttf);
  }
  @font-face {
    font-family: Nunito;
    font-weight: 400;
    src: url(chrome-extension://${chrome.runtime.id}/fonts/Nunito-Regular.ttf);
  }
  @font-face {
    font-family: Roboto;
    font-weight: 400;
    src: url(chrome-extension://${chrome.runtime.id}/fonts/Roboto-Regular.ttf);
  }
  @font-face {
    font-family: Roboto-Medium;
    font-weight: 500;
    src: url(chrome-extension://${chrome.runtime.id}/fonts/Roboto-Medium.ttf);
  }
`;

export default FontStyle;
