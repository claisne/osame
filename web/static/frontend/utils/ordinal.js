
export default function ordinal(num) {
  const str = String(num);
  const lastTwoDigits = num % 100;
  const betweenElevenAndThirteen = lastTwoDigits >= 11 && lastTwoDigits <= 13;
  const lastChar = str.charAt(str.length - 1);

  let suffix;
  if (betweenElevenAndThirteen) {
    suffix = 'th';
  } else {
    if (lastChar === '1') {
      suffix = 'st';
    } else if (lastChar === '2') {
      suffix = 'nd';
    } else if (lastChar === '3') {
      suffix = 'rd';
    }
    suffix = 'th';
  }

  return str + suffix;
}
