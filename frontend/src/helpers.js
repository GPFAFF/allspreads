function convertTime(time) {
  const date = new Date(time * 1000);
  return date.toLocaleString('en-US', { timeZone: 'America/New_York' });
}

function convertOdds(odds) {
  console.log(odds);
}

/* eslint-disable import/prefer-default-export */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function returnTarget(array, target) {
  return array.filter((item) => item !== target);
}

function returnKey(name) {
  switch (name) {
    case 'NCAA Football':
      return 'americanfootball_ncaaf';
    case 'Football':
      return '';
    case 'Baseball':
      return 'baseball_mlb';
    case 'Basketball':
      return 'basketball_nba';
    case 'NCAA Basketball':
      return 'basketball_ncaab';
    case 'Hockey':
      return 'icehockey_nhl';
    case 'Golf':
      return 'golf';
    default:
      throw new Error('key not found');
  }
}

module.exports = {
  convertTime,
  convertOdds,
  returnTarget,
  returnKey,
  uuidv4,
};
