export class Time{

    static getTimer(): number{
        let d: Date = new Date();
        return d.getTime()
      }
}