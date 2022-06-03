window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
window.LOCALE = 'fr';
window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Les informations fournies sont invalides. Veuillez vérifier le format du champ et réessayer.";

window.REQUIRED_ERROR_MESSAGE = "Ce champ ne peut pas être vide. ";

window.GENERIC_INVALID_MESSAGE = "Les informations fournies sont invalides. Veuillez vérifier le format du champ et réessayer.";

window.translation = {
  common: {
    selectedList: '{quantity} list selected',
    selectedLists: '{quantity} lists selected'
  }
};

var AUTOHIDE = Boolean(0);

function handleCaptchaResponse() {
  var event = new Event('captchaChange');
  document.getElementById('sib-captcha').dispatchEvent(event);
}