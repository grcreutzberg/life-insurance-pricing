import Factor from '../models/factor';

export default {
  setup: async (list: { "age": string, "factor": string }[]) => {
    await Factor.deleteMany({}).then(() => {
      list.map(async (item) => {
        await Factor.create(item);
      });
    });
  }
}
