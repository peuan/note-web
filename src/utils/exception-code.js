const exceptionCode = {
  invalid_username_or_password: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  something_wrong: "มีบางอย่างผิดพลาด",
  username_already_exist: "มีการใช้ Username นี้แล้ว",
};

export const getExceptionCode = (response) => {
  if (!response) {
    return "something_wrong";
  }
  return response.data.code;
};
export const mapExceptionCode = (response) => {
  const code = getExceptionCode(response);
  return exceptionCode[code];
};
