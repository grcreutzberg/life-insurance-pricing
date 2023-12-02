import Factor from '../models/factor';

export default {
  setup: async (list: { "age": string, "factor": string }[]) => {
    await Factor.deleteMany({}).then(() => {
      list.map(async (item) => {
        await Factor.create(item);
      });
    });
  },
  getFactor: async (age: number): Promise<string> => {
    return (await Factor.findOne({ age: { $gte: age } })).factor;
  }
}
