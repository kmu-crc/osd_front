import bowser from 'bowser';

// TODO: For testing.
window.BOWSER = bowser;

export default function () {
  const ua = navigator.userAgent;
  const browser = bowser.detect(ua); // getParser(ua);
  return {
    flag: browser.name,
    name: browser.name,
    version: browser.version
  };
}
