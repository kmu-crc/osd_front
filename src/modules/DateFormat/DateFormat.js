const DateFormat = (date) => {
  const update = new Date(date);
  const today = new Date();
  const diff = today - update;
  const diffHour = parseInt((diff / 1000) / 3600, 10); // N시간 전
  const diffDay = parseInt(diffHour / 24, 10); // N일 전

  const m = 30;

  if (diffDay < 1) { // 하루 전까지
    return `${diffHour}시간 전`;
  } else if (1 <= diffDay && diffDay < m) { // 한달 전까지
    return `${diffDay}일 전`;
  } else if (m <= diffDay) { // 한달 이후부터
    return `${parseInt(diffDay/m, 10)}달 전`;
  } 
}

export default DateFormat;