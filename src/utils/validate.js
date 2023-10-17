import { trimBetween } from "./helpers";

export const regExp = {
  password: /^[\w.!@#$%^&*=-|\/]{6,}$/,
  string: /^[a-zA-Zа-яА-Я]/,
  latin: /^[a-zA-Z]/,
  number: /^[0-9.]*$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  date: /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/,
  time: /^([0-1]?\d|2[0-3]):[0-5]\d$/,
  fulltime: /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  timeOrFulltime: /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
  tag: /(<([^>]+)>)/gi,
};

export default {
  required: (v) => !!trimBetween(v) || "Required",
  password: (v) => regExp.password.test(v) || "Enter correct password",
  date: (v) => (v ? regExp.date.test(v) || "Enter correct date" : true),
};
