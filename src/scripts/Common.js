export const TimeToRadians = (t, m) => {
    let adj = Math.PI / 2; /* 0 bottom */
    if (m === 12)
        adj = -Math.PI / 2; /* 0 top */
    let tt = t.toString().split(':');
    let angle = ((tt[0] * 60 + tt[1] * 1) * 2 * Math.PI / (m * 60)) + adj;
    angle = (angle % (2 * Math.PI));
    return angle;
    /* 24 hours = 1140 mins =  2Pi*/
    /* 1 minute = Pi/720 */
}