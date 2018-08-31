function iterateData(obj, prop) {
  let toSend = '';

  if (obj && obj !== '') {
    if (obj[prop]) {
      toSend = obj[prop];
    }
  }

  return toSend;
}

export default iterateData;
