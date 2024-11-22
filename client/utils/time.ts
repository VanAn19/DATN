export function convertUtcTimeToVNTime(utcDateTime: string) {
    const date = new Date(utcDateTime);
    // convert sang GMT +7
    const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    
    // convert từng thành phần
    const day = vietnamTime.getUTCDate().toString().padStart(2, '0');
    const month = (vietnamTime.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = vietnamTime.getUTCFullYear();
    const hours = vietnamTime.getUTCHours().toString().padStart(2, '0');
    const minutes = vietnamTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = vietnamTime.getUTCSeconds().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}