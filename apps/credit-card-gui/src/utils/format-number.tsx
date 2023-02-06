export default function numberFormat(num: number, prefix: string = ``, sufix: string = ``) {
    const countryCode = process.env.REACT_APP_COUNTRY_CODE_DEFAULT ?? `en-UK`;

    const formated = num.toLocaleString(countryCode, {minimumFractionDigits:2, maximumFractionDigits:2});

    const decorated = `${prefix}${formated}${sufix}`;

    return decorated;
}