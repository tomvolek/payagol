// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.payagol',
  name: 'Payagol',
  description: 'Flower auction',
  author: 'SRAjayebi',
  email: 'tomvolek@yahoo.com',
  website: 'http://payaol.meteorapp.com'
});
// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'public/icons/ios/AppIcon.appiconset/Icon-App-60x60@1x.png',
  'iphone_2x': 'public/icons/ios/AppIcon.appiconset/Icon-App-60x60@2x.png',
  'iphone_3x': 'public/icons/ios/AppIcon.appiconset/Icon-App-60x60@3x.png',
  // More screen sizes and platforms...
});
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin.
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);
