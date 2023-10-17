import { date, scroll, Notify } from "quasar";
const { setVerticalScrollPosition } = scroll;

export function getServerError({ response }, field = "errorCode") {
  if (!response) return "";
  return response?.data?.error?.[field] || "Has been error";
}

export function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

export function trimBetween(val) {
  if (!val) return val;
  const res = val.toString().replace(/\s+/g, "");
  if (isNaN(+res)) return res;
  return res;
}

export function getDateNow(format = "DD.MM.YYYY") {
  return date.formatDate(Date.now(), format);
}
export function formatDate(strDate, format = "DD.MM.YYYY") {
  if (!strDate) return "";
  let newDate = null;
  try {
    newDate = new Date(strDate.replace(/\s/, "T").replace(/Z/, "") + "Z");
    if (newDate.toString() === "Invalid Date") {
      return date.formatDate(date.extractDate(strDate, "DD.MM.YYYY"), format);
    }
  } catch (e) {
    return date.formatDate(strDate, format);
  }

  return date.formatDate(newDate, format);
}

export function prettify(num) {
  if (!num) return num;
  const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;

  const res = num.toString().replace(regExp, "$1 ");
  return res;
  // return (+num).toLocaleString()
}

export function deepCopy(data) {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}

export function removePhonePrefix(phoneNumber) {
  if (!phoneNumber) return "";
  return phoneNumber.slice(3);
}

export function formatDateToUTC(
  vDate,
  config = { format: "DD.MM.YYYY", endDay: false }
) {
  if (!vDate) return null;

  if (typeof vDate === "string") {
    vDate = new Date(
      date.formatDate(date.extractDate(vDate, config.format), "YYYY-MM-DD")
    );
  }

  if (config.endDay) vDate.setUTCHours(23, 59, 59, 999);
  else vDate.setUTCHours(0, 0, 0, 0);

  return vDate.toUTCString();
}
export function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export function onValidationError(ref) {
  scrollTo(ref.$el.offsetTop);
}

export function scrollTo(offset = 0, speed = 200) {
  const el = document.querySelector(".main-page");
  setVerticalScrollPosition(el, offset, speed);
}

export function round(num) {
  return Math.round((+num + Number.EPSILON) * 100) / 100;
}

export function onFileRejected(error) {
  if (error?.[0].failedPropValidation === "max-file-size") {
    Notify.create({
      progress: true,
      position: "top",
      message: t("file_size_exceeds_mb", { s: 5 }),
      type: "negative",
      timeout: 2000,
    });
  }
  if (error?.[0].failedPropValidation === "duplicate") {
    Notify.create({
      progress: true,
      position: "top",
      message: t("such_file_already_exists"),
      // message: t("maximum_number_of_files", { n: 3 }),
      type: "negative",
      timeout: 2000,
    });
  }
}
export function translate(item, filed) {
  return item?.translates?.[filed]?.uz || null;
}

export async function downloadBlobFile(data, fileName) {
  if (!data) return;

  const blob = new Blob([data]);
  let link = document.createElement("a");
  link.style.visibility = "hidden";
  let url = window.URL.createObjectURL(blob);
  link.href = url;

  // append url to element and trigger click
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // clean up
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  });
}

export const fileExtensionsTypeObj = {
  ["image/png"]: "png",
  ["image/jpeg"]: "jpeg",
  ["image/gif"]: "gif",
  ["application/pdf"]: "pdf",
};
