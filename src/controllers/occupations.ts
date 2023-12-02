import Ocuppation from '../models/occupations';

export default {
  setup: async (list: { "Code":string, "Name":string, "Active":boolean, "Factor":string }[]) => {
    await Ocuppation.deleteMany({}).then(() => {
      list.forEach(async (item) => {
        //console.log(item);
        await Ocuppation.create(item);
      });
    });
  }
}
