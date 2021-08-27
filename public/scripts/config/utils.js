export const convertVietToEng = (string) => {
    if (!string) return '';
    return string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

export const advanceSearch = (string, key, skip = 2) => {
    if (typeof string == 'object') string = JSON.stringify(string)
    key = convertVietToEng(key + '');
    string = convertVietToEng(string + '');
    // console.log(key);
    let pattern = '';
    key.split('').forEach((item, index) => {
        pattern = pattern + `.{0,${skip}}` + item;
    });
    let regex = new RegExp(pattern, 'i');

    if (regex.test(string)) {
        return true;
    }
    return false;
};

export const formatDateTime = (time, string) => {
    if (time == null || time == 0) {
        // console.warn('Invalid Date: ' + time);
        return 0
    }
    if (['string', 'number'].includes(typeof time)) {
        time = new Date(time)
    }
    if (Object.prototype.toString.call(time) !== '[object Date]' || time == 'Invalid Date') {
        console.warn('Invalid Date: ' + time)
        return 'Invalid Date'
    }
    if (!string) {
        console.warn('Invalid String: ' + string)
        return 'Invalid String'
    }

    let getTime = {
        YYYY: '' + time.getFullYear(),
        YY: ('' + time.getFullYear()).slice(-2),
        MM: ('0' + (time.getMonth() + 1)).slice(-2),
        dd: ('0' + time.getDate()).slice(-2),
        HH: ('0' + time.getHours()).slice(-2),
        mm: ('0' + time.getMinutes()).slice(-2),
        ss: ('0' + time.getSeconds()).slice(-2),
    }
    for (let key in getTime) {
        string = string.replace(key, getTime[key])
    }
    return string
}

export const pagination = (index, length, delta = 2) => {
    let array = [],
        left = index - delta - 1,
        right = index + delta + 1;
    for (let i = 1; i <= length; i++) {
        if (
            i == 1 ||
            i == length ||
            (i > left && i < right) ||
            (i == 2 && left == 2) ||
            (i == length - 1 && right == length - 1)
        ) {
            array.push(i);
        }
    }
    if (left > 2) {
        array.splice(1, 0, '...');
    }
    if (right < length - 1) {
        array.splice(-1, 0, '...');
    }
    return array;
};