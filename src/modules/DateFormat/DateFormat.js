const DateFormat = (date) => {
  let update = new Date(date).getTime();
  let today = new Date();
   //today = today.getTime() + 32400000;
  today = today.getTime();
  const diff = today - update;
  const diffMin = parseInt((diff / 1000) / 3600 * 60, 10); // N분 전
  const diffHour = parseInt((diff / 1000) / 3600, 10); // N시간 전
  const diffDay = parseInt(diffHour / 24, 10); // N일 전

  const m = 30;
  if (diffMin == 0) {
    return `방금 전`;
  } else if (diffHour < 1) { // 한시간 전까지
    return `${diffMin}분 전`;
  } else if (1 <= diffHour && diffDay < 1) { // 하루 전까지
    return `${diffHour}시간 전`;
  } else if (1 <= diffDay && diffDay < m) { // 한달 전까지
    return `${diffDay}일 전`;
  } else if (m <= diffDay) { // 한달 이후부터
    return `${parseInt(diffDay/m, 10)}달 전`;
  }
}

export default DateFormat;
