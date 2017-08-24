/**
 * Created by tajayebi on 8/17/17.
 */

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your first name");
                return false;
            } else {
                return true;
            }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    }]

});

var default_lang = TAPi18n.getLanguage();

//default_lang = 'fa'; // due to a bug in TAPi18n.setLanguage, we cheat here and set default lang to fa
i18n.setLanguage('fa');
var language = TAPi18next.detectLanguage();
console.log("our language===============",language);

if (default_lang == 'en') {
    i18n.setLanguage('en');
    TAPi18n.setLanguageAmplify('en');
    Uploader.localisation.dropFiles = "Drop Files Here";

} else if (default_lang == 'fa') {
    i18n.setLanguage('fa');
    TAPi18n.setLanguageAmplify('fa');
    Uploader.localisation.dropFiles = "رها کردن فایل ها در اینجا";
    accountsUIBootstrap3.setLanguage('fa');

}

