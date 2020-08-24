import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export default async (req, res) => {
  const { items, payer } = JSON.parse(req.body);
  try {
    const response = await mercadopago.preferences.create({ items })
    res.send({preferenceId: response.body.init_point.split('pref_id=')[1]});
  } catch(error) {
    console.log(error);
    res.status(403).send(error);
  }
};