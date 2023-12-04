import Ocuppation from '../models/occupations';

export default {
  setup: async (list: { "Code":string, "Name":string, "Active":boolean, "Factor":string }[]) => {
    await Ocuppation.deleteMany({}).then(() => {
      list.forEach(async (item) => {
        await Ocuppation.create(item);
      });
    });
  },
  getFactor: async (code: string): Promise<string> => {
    return ((await Ocuppation.findOne({ Code: code, Active: 'TRUE'}))?.Factor) || '1';
  }
}
