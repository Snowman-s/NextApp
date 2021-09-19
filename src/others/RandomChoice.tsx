export default class RandomChoice {
    public static choice<T>(array:T[], amount:number, random: (max:number)=>number):T[]{
        const copyArray = array.concat();

        //shuffle
        for (let index = copyArray.length-1; index >=0 ; index--) {
            const randomIndex = random(index + 1);
            const tmp = copyArray[index];
            copyArray[index] = copyArray[randomIndex];
            copyArray[randomIndex] = tmp;
        }

        return copyArray.slice(0, amount);
    }
}