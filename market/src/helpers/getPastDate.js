export default function getPastDate() {
  let today = new Date();
  today.setDate(today.getDate() - 3);
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = mm + "-" + dd + "-" + yyyy;

  return today;
}
