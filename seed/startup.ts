import Factor from "../src/controllers/factor";
import Occupations from "../src/controllers/occupations";
import User from "../src/models/user";
import Coverage from "../src/models/coverage";

// AQUI SÃO OS REGISTROS PRÉ DEFINIDOS PARA TESTES
async function startup() {
  const admin = await User.findOne({ username: 'Mario' });
  if (!admin?._id) {
    User.create({
      username: 'Mario',
      password: 'Senha@Forte!123',
      role: 'admin'
    });
  }

  const user = await User.findOne({ username: 'Bowser' });
  if (!user?._id) {
    User.create({
      username: 'Bowser',
      password: 'Senha@Forte!123',
      role: 'user'
    });
  }

  const coverage1 = await Coverage.findOne({ name: 'Invalidez Funcional Permanente Total por Doença' });
  if (!coverage1?._id) {
    Coverage.create({
      name: 'Invalidez Funcional Permanente Total por Doença',
      description: 'Essa cobertura garante a antecipação do pagamento da indenização relativa à garantia básica de Morte, em caso de invalidez funcional permanente total, consequente de doença.',
      capital: '18000',
      premium: '1000',
      active: true
    });
  }
  
  const coverage2 = await Coverage.findOne({ name: 'Indenização Especial por Morte Acidental' });
  if (!coverage2?._id) {
    Coverage.create({
      name: 'Indenização Especial por Morte Acidental',
      description: 'Essa cobertura garante um pagamento adicional, de mesmo valor, da indenização do seguro por Morte. Ou seja, o(s) beneficiário(s) da indenização receberá(ão) o dobro do capital segurado em caso de morte especifica por acidente.',
      capital: '58000',
      premium: '10000',
      active: true
    });
  }

  const agesFactor = require('../seed/ages.json');
  await Factor.setup(agesFactor);

  const csv = require('csvtojson');
  csv().fromFile('seed/occupations.csv').then(async (occupations) => {
    await Occupations.setup(occupations);
  });
}

export { startup };