export default function processData(data){
    const median = arr => {
        const mid = Math.floor(arr.length / 2),
         nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    let ttlWord,ttlTime,med_wpm,med_eff,err
    ttlTime = Math.round(data.reduce((r,a)=>r+a.duration,0)*10/60)/10
    ttlWord = Math.round(10*data.reduce((r,a)=>r+a.corrKey,0)/5)/10
    err = data.reduce((r,a)=>r+a.incorrectKeys,'')
    med_wpm = Math.round(median(data.filter(x=>x.wpm).map(x=>parseFloat(x.wpm)))*10)/10
    med_eff= Math.round(median(data.filter(x=>x.eff).map(x=>parseFloat(x.eff)))*100)/100
    return {ttlWord,ttlTime,med_wpm,med_eff,err}
}