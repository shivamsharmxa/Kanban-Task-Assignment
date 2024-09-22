import moment from "moment"; // Replaced `require` with `import`

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;
