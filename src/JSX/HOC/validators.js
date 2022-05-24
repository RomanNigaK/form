export const email = (text, error = '') => {
  if (text.length === 0) return error;
  let re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!re.test(text)) error = 'Email не корректен';
  return error
}

export const required = (text, error = '') => {
  if (text.length === 0) error =  'Поле обязательно для заполнения';
  return error;

}
