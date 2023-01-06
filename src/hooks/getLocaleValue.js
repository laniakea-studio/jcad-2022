export const getLocaleValue = (allLocales, locale) => {
  const val = allLocales.find((o) => o.locale === locale).value;
  return val;
};
