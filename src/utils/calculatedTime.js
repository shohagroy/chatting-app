import moment from "moment";

const getTimeDifference = (createdAt) => {
  const currentTime = moment();
  const givenTime = moment(createdAt);

  const duration = moment.duration(currentTime.diff(givenTime));

  const minutes = parseInt(duration.asMinutes());
  const hours = parseInt(duration.asHours());
  const days = parseInt(duration.asDays());
  const weeks = parseInt(duration.asWeeks());
  const months = parseInt(duration.asMonths());

  let messageTime;

  if (minutes < 1) {
    messageTime = "now";
  } else if (minutes < 60) {
    messageTime = `${minutes}m`;
  } else if (hours < 24) {
    messageTime = `${hours}h`;
  } else if (days < 7) {
    messageTime = `${days}d`;
  } else if (weeks < 5) {
    messageTime = `${weeks}w`;
  } else if (months < 12) {
    messageTime = `${months}m`;
  } else {
    messageTime = null;
  }

  return messageTime;
};

export default getTimeDifference;
