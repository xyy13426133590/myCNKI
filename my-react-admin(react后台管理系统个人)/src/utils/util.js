/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @return {number}
 */

export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}